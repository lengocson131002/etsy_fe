export interface Conversation {
  id?: number;
  customerName?: string;
  customerImage?: string;
  unreadCount?: number;
  messageTime?: string;
  shopId: string;
  shopName: string;
}

export interface Message {
  id?: number;
  content: string;
  time: string;
  isAdmin: boolean;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
}

