```typescript
export enum ContentFlag {
  HATE_SPEECH = 'HATE_SPEECH',
  VIOLENCE = 'VIOLENCE',
  HARASSMENT = 'HARASSMENT',
  ADULT = 'ADULT',
  SPAM = 'SPAM',
  UNKNOWN = 'UNKNOWN'
}

export interface ModerationResult {
  isAllowed: boolean;
  flags: ContentFlag[];
  confidence: number;
  suggestedAction: 'ALLOW' | 'FLAG' | 'BLOCK';
  reason?: string;
}

export interface ContentModerationConfig {
  enabled: boolean;
  autoBlock: boolean;
  minimumConfidence: number;
  flaggedContentCallback?: (result: ModerationResult) => void;
}
```