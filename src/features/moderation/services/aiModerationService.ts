```typescript
import { ContentModerationConfig, ModerationResult, ContentFlag } from '../types';
import { AuditLogger } from '../../../utils/security/auditLogger';
import { supabase } from '../../../lib/supabase';

export class AIModerationService {
  private static readonly TOXIC_PATTERNS = {
    hate_speech: /\b(hate|racist|bigot|discriminat(e|ion)|nazi)\b/i,
    harassment: /\b(harass|bully|threaten|stalk)\b/i,
    violence: /\b(kill|murder|hurt|attack|fight)\b/i,
    adult: /\b(sex|porn|nude|explicit)\b/i,
    spam: /\b(buy|sell|discount|offer|price|deal)\b/i
  };

  private static readonly SEVERITY_WEIGHTS = {
    hate_speech: 0.9,
    harassment: 0.8,
    violence: 0.85,
    adult: 0.7,
    spam: 0.5
  };

  static async moderateContent(
    content: string,
    config: ContentModerationConfig
  ): Promise<ModerationResult> {
    try {
      // Check content against patterns
      const flags = this.checkContent(content);
      
      // Calculate confidence score
      const confidence = this.calculateConfidence(flags);

      // Log moderation result
      await this.logModerationResult(content, flags, confidence);

      // Determine if content should be blocked
      const shouldBlock = config.autoBlock && confidence >= config.minimumConfidence;

      return {
        isAllowed: !shouldBlock,
        flags,
        confidence,
        suggestedAction: shouldBlock ? 'BLOCK' : flags.length > 0 ? 'FLAG' : 'ALLOW',
        reason: shouldBlock ? 'Content violates community guidelines' : undefined
      };
    } catch (error) {
      console.error('AI moderation error:', error);
      AuditLogger.log('moderation_error', { error }, 'error');
      
      // Fail safe - block content if moderation fails
      return {
        isAllowed: false,
        flags: [ContentFlag.UNKNOWN],
        confidence: 1,
        suggestedAction: 'BLOCK',
        reason: 'Moderation service error'
      };
    }
  }

  private static checkContent(content: string): ContentFlag[] {
    const flags: ContentFlag[] = [];
    const normalizedContent = content.toLowerCase();

    Object.entries(this.TOXIC_PATTERNS).forEach(([category, pattern]) => {
      if (pattern.test(normalizedContent)) {
        flags.push(this.getCategoryFlag(category));
      }
    });

    return flags;
  }

  private static getCategoryFlag(category: string): ContentFlag {
    switch (category) {
      case 'hate_speech': return ContentFlag.HATE_SPEECH;
      case 'harassment': return ContentFlag.HARASSMENT;
      case 'violence': return ContentFlag.VIOLENCE;
      case 'adult': return ContentFlag.ADULT;
      default: return ContentFlag.SPAM;
    }
  }

  private static calculateConfidence(flags: ContentFlag[]): number {
    if (flags.length === 0) return 0;

    const weights = flags.map(flag => {
      switch (flag) {
        case ContentFlag.HATE_SPEECH: return this.SEVERITY_WEIGHTS.hate_speech;
        case ContentFlag.HARASSMENT: return this.SEVERITY_WEIGHTS.harassment;
        case ContentFlag.VIOLENCE: return this.SEVERITY_WEIGHTS.violence;
        case ContentFlag.ADULT: return this.SEVERITY_WEIGHTS.adult;
        case ContentFlag.SPAM: return this.SEVERITY_WEIGHTS.spam;
        default: return 0.3;
      }
    });

    return Math.max(...weights);
  }

  private static async logModerationResult(
    content: string,
    flags: ContentFlag[],
    confidence: number
  ): Promise<void> {
    await supabase.from('moderation_logs').insert({
      content: content.substring(0, 500), // Limit content length
      flags: flags,
      confidence: confidence,
      timestamp: new Date().toISOString()
    });
  }
}
```