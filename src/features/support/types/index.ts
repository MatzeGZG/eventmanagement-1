export interface ChatbotResponse {
  type: 'text' | 'action';
  content: string;
  category: string;
  actions?: {
    label: string;
    action: string;
  }[];
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: string;
}