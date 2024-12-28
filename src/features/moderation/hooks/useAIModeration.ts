```typescript
import { useCallback } from 'react';
import { AIModerationService } from '../services/aiModerationService';
import { ContentModerationConfig, ModerationResult } from '../types';
import { useToast } from '../../../hooks/useToast';
import { AuditLogger } from '../../../utils/security/auditLogger';

export const useAIModeration = (config: ContentModerationConfig) => {
  const { showToast } = useToast();

  const moderateContent = useCallback(async (content: string): Promise<ModerationResult> => {
    try {
      const result = await AIModerationService.moderateContent(content, config);

      // Handle flagged content callback
      if (result.flags.length > 0 && config.flaggedContentCallback) {
        config.flaggedContentCallback(result);
      }

      // Show warning for blocked content
      if (!result.isAllowed) {
        showToast(
          result.reason || 'This content violates our community guidelines',
          'error'
        );

        // Log blocked content
        AuditLogger.log('content_blocked', {
          flags: result.flags,
          confidence: result.confidence
        }, 'warning');
      }

      return result;
    } catch (error) {
      console.error('AI moderation error:', error);
      showToast('Content moderation failed', 'error');
      
      // Fail safe - block content if moderation fails
      return {
        isAllowed: false,
        flags: [],
        confidence: 1,
        suggestedAction: 'BLOCK',
        reason: 'Moderation service error'
      };
    }
  }, [config, showToast]);

  return { moderateContent };
};
```