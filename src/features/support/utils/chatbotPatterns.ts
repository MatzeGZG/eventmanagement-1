// Add more sophisticated patterns with context awareness and multi-turn conversations
export const CHATBOT_PATTERNS = {
  // Account & Profile
  ACCOUNT: [
    {
      patterns: ['account', 'profile', 'settings', 'preferences'],
      responses: [
        {
          content: "You can manage your account settings in your profile page. Would you like me to guide you there?",
          actions: [
            { label: 'Go to Profile', action: 'NAVIGATE_PROFILE' },
            { label: 'Show Settings', action: 'SHOW_SETTINGS' }
          ]
        }
      ],
      followUp: ['Would you like help with anything specific in your settings?']
    }
  ],

  // Event Discovery & Booking
  EVENTS: [
    {
      patterns: ['find events', 'discover', 'what\'s happening', 'events near'],
      responses: [
        {
          content: "I can help you discover events! What interests you most?",
          actions: [
            { label: 'Trending Events', action: 'SHOW_TRENDING' },
            { label: 'Nearby Events', action: 'SHOW_NEARBY' },
            { label: 'Recommended', action: 'SHOW_RECOMMENDED' }
          ]
        }
      ],
      contextual: {
        location: true,
        interests: true
      }
    }
  ],

  // Points & Rewards System
  REWARDS: [
    {
      patterns: ['points', 'rewards', 'earn', 'level up'],
      responses: [
        {
          content: "Here's your current rewards status:",
          dynamic: true,
          template: "You have {{points}} points and are {{progress}}% to level {{nextLevel}}. Here's what you can do:",
          actions: [
            { label: 'View Rewards', action: 'SHOW_REWARDS' },
            { label: 'Ways to Earn', action: 'SHOW_EARNING_OPPORTUNITIES' }
          ]
        }
      ],
      contextual: {
        userLevel: true,
        pointsBalance: true
      }
    }
  ],

  // Social Features & Networking
  SOCIAL: [
    {
      patterns: ['connect', 'network', 'meet people', 'find friends'],
      responses: [
        {
          content: "I can help you connect with like-minded people! Here are some ways to get started:",
          actions: [
            { label: 'Find Connections', action: 'SHOW_CONNECTIONS' },
            { label: 'Join Groups', action: 'SHOW_GROUPS' },
            { label: 'Upcoming Events', action: 'SHOW_SOCIAL_EVENTS' }
          ]
        }
      ],
      contextual: {
        interests: true,
        location: true
      }
    }
  ],

  // Personalized Recommendations
  RECOMMENDATIONS: [
    {
      patterns: ['recommend', 'suggest', 'what should I'],
      responses: [
        {
          content: "Based on your interests and past activities, I recommend:",
          dynamic: true,
          requiresAuth: true,
          actions: [
            { label: 'View All', action: 'SHOW_RECOMMENDATIONS' },
            { label: 'Refine', action: 'REFINE_PREFERENCES' }
          ]
        }
      ],
      contextual: {
        interests: true,
        history: true,
        location: true
      }
    }
  ],

  // Help & Support
  HELP: [
    {
      patterns: ['help', 'support', 'contact', 'assistance'],
      responses: [
        {
          content: "I'm here to help! What do you need assistance with?",
          quickReplies: [
            'Account Issues',
            'Event Booking',
            'Technical Support',
            'Billing Questions'
          ],
          actions: [
            { label: 'Contact Support', action: 'CONTACT_SUPPORT' },
            { label: 'View FAQs', action: 'SHOW_FAQS' }
          ]
        }
      ]
    }
  ],

  // Smart Fallbacks
  FALLBACK: [
    {
      content: "I'm not quite sure about that. Here are some options that might help:",
      actions: [
        { label: 'Browse Help Topics', action: 'SHOW_HELP' },
        { label: 'Contact Support', action: 'CONTACT_SUPPORT' }
      ],
      followUp: "Or you can rephrase your question and I'll try again!"
    }
  ]
};

// Enhanced response generation with context awareness
export const generateResponse = async (
  message: string,
  context: {
    user?: any;
    location?: any;
    history?: ChatMessage[];
  }
): Promise<ChatbotResponse> => {
  const normalizedMessage = message.toLowerCase();
  
  // Check for conversation context
  const conversationContext = analyzeConversationContext(context.history || []);
  
  // Find matching pattern with context
  for (const [category, patterns] of Object.entries(CHATBOT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.patterns.some(p => normalizedMessage.includes(p))) {
        // Get base response
        const response = getResponseWithContext(pattern, context);
        
        // Add follow-up suggestions if available
        if (pattern.followUp) {
          response.followUp = pattern.followUp[Math.floor(Math.random() * pattern.followUp.length)];
        }

        // Add contextual actions
        if (pattern.contextual) {
          response.actions = await getContextualActions(pattern.contextual, context);
        }

        return response;
      }
    }
  }

  // Return smart fallback
  return getSmartFallback(normalizedMessage, context);
};

// Helper functions for context-aware responses
const analyzeConversationContext = (history: ChatMessage[]) => {
  // Analyze conversation flow and context
  const recentMessages = history.slice(-3);
  const topics = extractTopics(recentMessages);
  return { recentMessages, topics };
};

const getResponseWithContext = (pattern: any, context: any) => {
  if (!pattern.dynamic) {
    return {
      type: 'text',
      content: pattern.responses[Math.floor(Math.random() * pattern.responses.length)].content,
      category: pattern.category
    };
  }

  // Generate dynamic response based on context
  return generateDynamicResponse(pattern, context);
};

const getContextualActions = async (contextRequirements: any, context: any) => {
  const actions = [];
  
  if (contextRequirements.location && context.location) {
    actions.push({ label: 'Nearby Events', action: 'SHOW_NEARBY' });
  }
  
  if (contextRequirements.interests && context.user?.interests) {
    actions.push({ label: 'Matching Events', action: 'SHOW_MATCHING' });
  }

  return actions;
};

const getSmartFallback = (message: string, context: any) => {
  // Implement smart fallback logic based on message content and context
  const suggestedTopics = getSuggestedTopics(message);
  
  return {
    type: 'text',
    content: CHATBOT_PATTERNS.FALLBACK[0].content,
    category: 'FALLBACK',
    suggestions: suggestedTopics
  };
};