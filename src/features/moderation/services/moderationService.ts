```typescript
import { ContentFlag, ModerationResult } from '../types';

export class ModerationService {
  private static readonly SENSITIVE_PATTERNS = {
    crime: /\b(theft|robbery|steal|crime|criminal|illegal)\b/i,
    fraud: /\b(scam|fraud|fake|counterfeit|money laundering)\b/i,
    violence: /\b(kill|attack|fight|weapon|violent|threat)\b/i,
    drugs: /\b(drugs?|cocaine|heroin|dealer)\b/i,
    personalInfo: /\b(\d{3}[-.]?\d{3}[-.]?\d{4}|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)/i,
    moneyLaundering: /\b(launder|wash money|clean money|shell company)\b/i
  };

  private static readonly BLOCKED_WORDS = [
    'rape',
    'terrorist',
    'trafficking',
    // Add more blocked words
  ];

  static async moderateContent(content: string): Promise<ModerationResult> {
    const flags: ContentFlag[] = [];
    let confidence = 0;

    // Check for blocked words (immediate block)
    const hasBlockedWords = this.BLOCKED_WORDS.some(word => 
      content.toLowerCase().includes(word)
    );

    if (hasBlockedWords) {
      return {
        isAllowed: false,
        flags: [ContentFlag.HATE_SPEECH],
        confidence: 1,
        suggestedAction: 'BLOCK',
        reason: 'Content contains prohibited words'
      };
    }

    // Check for sensitive patterns
    Object.entries(this.SENSITIVE_PATTERNS).forEach(([category, pattern]) => {
      const matches = content.match(pattern);
      if (matches) {
        flags.push(this.getCategoryFlag(category));
        confidence = Math.max(confidence, 0.8);
      }
    });

    // Check for potential money laundering indicators
    if (this.detectMoneyLaundering(content)) {
      flags.push(ContentFlag.MONEY_LAUNDERING);
      confidence = Math.max(confidence, 0.9);
    }

    // Determine action based on flags and confidence
    const suggestedAction = this.determineSuggestedAction(flags, confidence);

    return {
      isAllowed: suggestedAction !== 'BLOCK',
      flags,
      confidence,
      suggestedAction,
      reason: flags.length > 0 ? `Content flagged for: ${flags.join(', ')}` : undefined
    };
  }

  private static getCategoryFlag(category: string): ContentFlag {
    switch (category) {
      case 'crime': return ContentFlag.CRIME;
      case 'fraud': return ContentFlag.FRAUD;
      case 'violence': return ContentFlag.VIOLENCE;
      case 'drugs': return ContentFlag.DRUGS;
      case 'personalInfo': return ContentFlag.PERSONAL_INFO;
      case 'moneyLaundering': return ContentFlag.MONEY_LAUNDERING;
      default: return ContentFlag.SPAM;
    }
  }

  private static detectMoneyLaundering(content: string): boolean {
    const indicators = [
      /\b(multiple transactions|split payments)\b/i,
      /\b(offshore|shell company|nominee)\b/i,
      /\b(structure|smurfing|layering)\b/i
    ];

    return indicators.some(pattern => pattern.test(content));
  }

  private static determineSuggestedAction(
    flags: ContentFlag[],
    confidence: number
  ): 'ALLOW' | 'FLAG' | 'BLOCK' {
    if (confidence > 0.9 || flags.length > 2) {
      return 'BLOCK';
    }
    if (confidence > 0.7 || flags.length > 0) {
      return 'FLAG';
    }
    return 'ALLOW';
  }
}
```