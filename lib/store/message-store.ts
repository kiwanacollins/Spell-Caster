import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Multi-Channel Message Store
 * Manages unified inbox state for WhatsApp, Messenger, and In-App messages
 */

export type MessageChannel = 'whatsapp' | 'messenger' | 'in-app';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
  id: string;
  conversationId: string;
  channel: MessageChannel;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isHealer?: boolean;
  };
  content: string;
  timestamp: Date;
  status: MessageStatus;
  isRead: boolean;
  attachments?: {
    type: 'image' | 'video' | 'document' | 'audio';
    url: string;
    name?: string;
  }[];
  metadata?: {
    whatsappMessageId?: string;
    messengerMessageId?: string;
    isAIGenerated?: boolean;
    sentimentScore?: number;
  };
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  channel: MessageChannel;
  lastMessage?: Message;
  unreadCount: number;
  isTyping: boolean;
  isPinned: boolean;
  lastActivityAt: Date;
}

interface MessageState {
  // Messages
  messages: Record<string, Message[]>; // conversationId -> messages
  conversations: Conversation[];
  activeConversationId: string | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  typingUsers: Record<string, string[]>; // conversationId -> userIds[]
  
  // Counters
  totalUnreadCount: number;
  unreadByChannel: Record<MessageChannel, number>;
  
  // Actions - Messages
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  markAsRead: (conversationId: string, messageIds: string[]) => void;
  markConversationAsRead: (conversationId: string) => void;
  
  // Actions - Conversations
  setConversations: (conversations: Conversation[]) => void;
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void;
  setActiveConversation: (conversationId: string | null) => void;
  pinConversation: (conversationId: string) => void;
  unpinConversation: (conversationId: string) => void;
  
  // Actions - Typing Indicators
  setTyping: (conversationId: string, userId: string, isTyping: boolean) => void;
  
  // Actions - Bulk Operations
  loadMessages: (conversationId: string, messages: Message[]) => void;
  clearConversation: (conversationId: string) => void;
  
  // Actions - Error Handling
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Helpers
  getUnreadCount: (channel?: MessageChannel) => number;
  getConversationMessages: (conversationId: string) => Message[];
}

export const useMessageStore = create<MessageState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        messages: {},
        conversations: [],
        activeConversationId: null,
        isLoading: false,
        error: null,
        typingUsers: {},
        totalUnreadCount: 0,
        unreadByChannel: {
          whatsapp: 0,
          messenger: 0,
          'in-app': 0,
        },

        // Message Actions
        addMessage: (conversationId, message) =>
          set((state) => {
            const conversationMessages = state.messages[conversationId] || [];
            const newMessages = {
              ...state.messages,
              [conversationId]: [...conversationMessages, message],
            };

            // Update conversation
            const conversations = state.conversations.map((conv) =>
              conv.id === conversationId
                ? {
                    ...conv,
                    lastMessage: message,
                    lastActivityAt: message.timestamp,
                    unreadCount: message.sender.isHealer
                      ? conv.unreadCount
                      : conv.unreadCount + 1,
                  }
                : conv
            );

            // Recalculate unread counts
            const totalUnreadCount = conversations.reduce(
              (sum, conv) => sum + conv.unreadCount,
              0
            );
            const unreadByChannel = conversations.reduce(
              (acc, conv) => ({
                ...acc,
                [conv.channel]: acc[conv.channel] + conv.unreadCount,
              }),
              { whatsapp: 0, messenger: 0, 'in-app': 0 }
            );

            return {
              messages: newMessages,
              conversations,
              totalUnreadCount,
              unreadByChannel,
            };
          }),

        updateMessage: (conversationId, messageId, updates) =>
          set((state) => ({
            messages: {
              ...state.messages,
              [conversationId]: state.messages[conversationId]?.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg
              ),
            },
          })),

        deleteMessage: (conversationId, messageId) =>
          set((state) => ({
            messages: {
              ...state.messages,
              [conversationId]: state.messages[conversationId]?.filter(
                (msg) => msg.id !== messageId
              ),
            },
          })),

        markAsRead: (conversationId, messageIds) =>
          set((state) => ({
            messages: {
              ...state.messages,
              [conversationId]: state.messages[conversationId]?.map((msg) =>
                messageIds.includes(msg.id)
                  ? { ...msg, isRead: true, status: 'read' as MessageStatus }
                  : msg
              ),
            },
          })),

        markConversationAsRead: (conversationId) =>
          set((state) => {
            const conversation = state.conversations.find(
              (conv) => conv.id === conversationId
            );
            if (!conversation) return state;

            const unreadDiff = conversation.unreadCount;
            const conversations = state.conversations.map((conv) =>
              conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
            );

            return {
              conversations,
              totalUnreadCount: state.totalUnreadCount - unreadDiff,
              unreadByChannel: {
                ...state.unreadByChannel,
                [conversation.channel]:
                  state.unreadByChannel[conversation.channel] - unreadDiff,
              },
              messages: {
                ...state.messages,
                [conversationId]: state.messages[conversationId]?.map((msg) => ({
                  ...msg,
                  isRead: true,
                })),
              },
            };
          }),

        // Conversation Actions
        setConversations: (conversations) =>
          set({
            conversations,
            totalUnreadCount: conversations.reduce(
              (sum, conv) => sum + conv.unreadCount,
              0
            ),
            unreadByChannel: conversations.reduce(
              (acc, conv) => ({
                ...acc,
                [conv.channel]: acc[conv.channel] + conv.unreadCount,
              }),
              { whatsapp: 0, messenger: 0, 'in-app': 0 }
            ),
          }),

        updateConversation: (conversationId, updates) =>
          set((state) => ({
            conversations: state.conversations.map((conv) =>
              conv.id === conversationId ? { ...conv, ...updates } : conv
            ),
          })),

        setActiveConversation: (conversationId) =>
          set({ activeConversationId: conversationId }),

        pinConversation: (conversationId) =>
          set((state) => ({
            conversations: state.conversations.map((conv) =>
              conv.id === conversationId ? { ...conv, isPinned: true } : conv
            ),
          })),

        unpinConversation: (conversationId) =>
          set((state) => ({
            conversations: state.conversations.map((conv) =>
              conv.id === conversationId ? { ...conv, isPinned: false } : conv
            ),
          })),

        // Typing Indicators
        setTyping: (conversationId, userId, isTyping) =>
          set((state) => {
            const currentTyping = state.typingUsers[conversationId] || [];
            const newTyping = isTyping
              ? [...currentTyping, userId]
              : currentTyping.filter((id) => id !== userId);

            return {
              typingUsers: {
                ...state.typingUsers,
                [conversationId]: newTyping,
              },
              conversations: state.conversations.map((conv) =>
                conv.id === conversationId
                  ? { ...conv, isTyping: newTyping.length > 0 }
                  : conv
              ),
            };
          }),

        // Bulk Operations
        loadMessages: (conversationId, messages) =>
          set((state) => ({
            messages: {
              ...state.messages,
              [conversationId]: messages,
            },
          })),

        clearConversation: (conversationId) =>
          set((state) => {
            const newMessages = { ...state.messages };
            delete newMessages[conversationId];
            return { messages: newMessages };
          }),

        // Error Handling
        setError: (error) => set({ error }),
        setLoading: (isLoading) => set({ isLoading }),

        // Helpers
        getUnreadCount: (channel) => {
          const state = get();
          return channel
            ? state.unreadByChannel[channel]
            : state.totalUnreadCount;
        },

        getConversationMessages: (conversationId) => {
          const state = get();
          return state.messages[conversationId] || [];
        },
      }),
      {
        name: 'message-storage',
        partialize: (state) => ({
          // Only persist conversations and unread counts, not all messages
          conversations: state.conversations,
          totalUnreadCount: state.totalUnreadCount,
          unreadByChannel: state.unreadByChannel,
        }),
      }
    ),
    { name: 'MessageStore' }
  )
);
