```typescript
import { useCallback } from 'react';
import { ModerationService } from '../services/moderationService';
import { ModerationResult, ContentModerationConfig } from '../types';

export const useContentModeration = (config: ContentModerationConfig) => {
  const moderateContent = useCallback(async (
    content: string
  ): Promise<ModerationResult> => {
    if (!config.enabled) {
      return {
        isAllowed: true,
        flags: [],
        confidence: 0,
        suggestedAction: 'ALLOW'
      };
    }

    try {
      const result = await ModerationService.moderateContent(content);

      // Handle flagged content callback
      if (result.flags.length > 0 && config.flaggedContentCallback) {
        config.flaggedContentCallback(result);
      }

      // Auto-block if configured and confidence is high enough
      if (config.autoBlock && 
          result.confidence >= config.minimumConfidence && 
          result.suggestedAction === 'BLOCK') {
        result.isAllowed = false;
      }

      return result;
    } catch (error) {
      console.error('Content moderation error:', error);
      // Fail safe - block content if moderation fails
      return {
        isAllowed: false,
        flags: [],
        confidence: 1,
        suggestedAction: 'BLOCK',
        reason: 'Moderation service error'
      };
    }
  }, [config]);

  return { moderateContent };
};
```