# State Management with Zustand

This project uses [Zustand](https://github.com/pmndrs/zustand) for global state management. Zustand is a lightweight, fast, and scalable state management solution that works seamlessly with React Server Components and Next.js 15 App Router.

## Why Zustand?

- **Minimal Boilerplate**: Simple API with no providers or reducers
- **Small Bundle Size**: ~1KB gzipped
- **TypeScript First**: Full type safety out of the box
- **DevTools Support**: Built-in Redux DevTools integration
- **Persistence**: Easy localStorage/sessionStorage sync
- **Server Components Compatible**: Works with Next.js 15 App Router

## Available Stores

### 1. Message Store (`useMessageStore`)

Manages multi-channel messaging (WhatsApp, Messenger, In-App).

**Location**: `lib/store/message-store.ts`

**Features**:
- Unified inbox across all channels
- Real-time message updates
- Typing indicators
- Read receipts
- Conversation management
- Unread count tracking

**Usage**:

```tsx
'use client';

import { useMessageStore } from '@/lib/store';

export function MessageInbox() {
  const { 
    conversations, 
    totalUnreadCount,
    setActiveConversation,
    markConversationAsRead 
  } = useMessageStore();

  return (
    <div>
      <h2>Messages ({totalUnreadCount})</h2>
      {conversations.map((conv) => (
        <div 
          key={conv.id}
          onClick={() => {
            setActiveConversation(conv.id);
            markConversationAsRead(conv.id);
          }}
        >
          {conv.userName} - {conv.unreadCount} unread
        </div>
      ))}
    </div>
  );
}
```

**Key Methods**:
```typescript
// Add new message
addMessage(conversationId, message);

// Mark messages as read
markAsRead(conversationId, messageIds);
markConversationAsRead(conversationId);

// Typing indicators
setTyping(conversationId, userId, isTyping);

// Get unread counts
getUnreadCount(); // Total
getUnreadCount('whatsapp'); // Per channel
```

---

### 2. User Store (`useUserStore`)

Manages user profile, spiritual progress, and preferences.

**Location**: `lib/store/user-store.ts`

**Features**:
- User authentication state
- Spiritual profile (energy, badges, level)
- Chakra balance tracking
- Preferences management
- Stats and achievements
- Energy history

**Usage**:

```tsx
'use client';

import { useUserStore } from '@/lib/store';

export function EnergyMeter() {
  const { 
    user,
    updateEnergyAlignment,
    awardSpiritualPoints 
  } = useUserStore();

  if (!user) return null;

  return (
    <div>
      <h3>Energy Alignment: {user.spiritualProfile.energyAlignment}%</h3>
      <progress value={user.spiritualProfile.energyAlignment} max={100} />
      
      <button onClick={() => updateEnergyAlignment(75)}>
        Update Energy
      </button>
      
      <button onClick={() => awardSpiritualPoints(100, 'Daily meditation')}>
        Award Points
      </button>
    </div>
  );
}
```

**Key Methods**:
```typescript
// Authentication
setUser(user);
logout();

// Spiritual Progress
updateEnergyAlignment(value);
awardSpiritualPoints(points, reason);
unlockBadge(badge);
updateChakra('heart', 85);

// Preferences
updatePreferences({ theme: { reducedMotion: true } });
toggleNotification('email');

// Stats
incrementStat('totalSpellsRequested');
updateStreak();
addSpent(49.99);

// Helpers
canLevelUp();
getNextLevelPoints();
getBadgesByCategory('achievement');
```

---

### 3. Spell Queue Store (`useSpellQueueStore`)

Manages admin spell queue, AI responses, and workflow.

**Location**: `lib/store/spell-queue-store.ts`

**Features**:
- Spell request queue
- Status tracking
- AI response generation
- Priority management
- Filtering and sorting
- Bulk operations
- Real-time stats

**Usage**:

```tsx
'use client';

import { useSpellQueueStore } from '@/lib/store';

export function AdminSpellQueue() {
  const { 
    filteredSpells,
    stats,
    updateStatus,
    generateAIResponse,
    setFilters 
  } = useSpellQueueStore();

  return (
    <div>
      <h2>Spell Queue ({stats.needsAttention} need attention)</h2>
      
      <button onClick={() => setFilters({ status: ['pending'] })}>
        Show Pending Only
      </button>

      {filteredSpells.map((spell) => (
        <div key={spell.id}>
          <h3>{spell.title}</h3>
          <p>Status: {spell.status}</p>
          
          {spell.status === 'pending' && (
            <button onClick={() => generateAIResponse(spell.id)}>
              Generate AI Response
            </button>
          )}
          
          {spell.status === 'ready-for-approval' && (
            <button onClick={() => updateStatus(spell.id, 'approved')}>
              Approve & Start Casting
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
```

**Key Methods**:
```typescript
// Queue Management
setSpells(spells);
addSpell(spell);
updateSpell(spellId, updates);

// Status & Priority
updateStatus(spellId, 'in-progress');
updatePriority(spellId, 'urgent');

// AI Integration
await generateAIResponse(spellId);
approveAIResponse(spellId, modifications);
rejectAIResponse(spellId);

// Filtering
setFilters({ status: ['pending', 'reviewing'] });
setSortBy('priority');
toggleSortOrder();

// Bulk Operations
bulkUpdateStatus(['spell1', 'spell2'], 'approved');
bulkUpdatePriority(['spell3', 'spell4'], 'high');

// Helpers
getSpellById(spellId);
getSpellsByStatus('pending');
getNeedsAttention();
```

---

### 4. Notification Store (`useNotificationStore`)

Manages toast notifications with mystical theming.

**Location**: `lib/store/notification-store.ts`

**Features**:
- Toast notifications
- Multiple types (success, error, warning, info, mystical)
- Auto-dismiss with custom duration
- Action buttons
- Mystical effects (glow, sounds)
- Position control

**Usage**:

```tsx
'use client';

import { useNotificationStore } from '@/lib/store';

export function SpellSubmitButton() {
  const { success, error, mystical } = useNotificationStore();

  const handleSubmit = async () => {
    try {
      await submitSpell();
      
      mystical(
        'Spell Request Received',
        'The spirits have heard your call. A healer will attend to your request shortly.',
        '🔮',
        '#B8860B'
      );
    } catch (err) {
      error(
        'Ritual Interrupted',
        'The mystical energies were disrupted. Please try again.',
        8000
      );
    }
  };

  return <button onClick={handleSubmit}>Submit Spell</button>;
}
```

**Notification Component** (you'll create this):

```tsx
'use client';

import { useNotificationStore } from '@/lib/store';
import { useEffect } from 'react';

export function NotificationContainer() {
  const { notifications, dismissNotification, position } = useNotificationStore();

  return (
    <div className={`fixed ${position} z-50 p-4 space-y-2`}>
      {notifications
        .filter(n => !n.isDismissed)
        .map((notification) => (
          <div
            key={notification.id}
            className="parchment-card p-4 shadow-lg animate-slide-in"
            style={{ 
              boxShadow: `0 0 20px ${notification.glowColor}` 
            }}
          >
            <div className="flex items-start gap-3">
              {notification.icon && (
                <span className="text-2xl">{notification.icon}</span>
              )}
              <div className="flex-1">
                <h4 className="font-medieval text-lg">{notification.title}</h4>
                {notification.message && (
                  <p className="text-sm text-aged-bronze">{notification.message}</p>
                )}
              </div>
              <button onClick={() => dismissNotification(notification.id)}>
                ✕
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
```

**Key Methods**:
```typescript
// Convenience methods
success('Profile Updated', 'Your spiritual profile has been saved.');
error('Payment Failed', 'Unable to process payment. Please try again.');
warning('Session Expiring', 'Your session will expire in 5 minutes.');
info('New Message', 'You have a new message from the healer.');
mystical('Badge Unlocked!', 'You earned the Moon Child badge.', '🌙', '#C0C0C0');

// Full control
addNotification({
  type: 'mystical',
  title: 'Energy Surge',
  message: 'Your energy alignment increased by 15%',
  duration: 5000,
  icon: '⚡',
  glowColor: '#CC8800',
  action: {
    label: 'View Progress',
    onClick: () => router.push('/dashboard/progress'),
  },
});

// Management
dismissNotification(id);
clearAll();
```

---

## Integration Patterns

### Server Components + Client Components

```tsx
// app/dashboard/page.tsx (Server Component)
import { ClientDashboard } from './client-dashboard';

export default async function DashboardPage() {
  // Fetch data server-side
  const initialData = await fetchUserData();
  
  return <ClientDashboard initialData={initialData} />;
}

// app/dashboard/client-dashboard.tsx (Client Component)
'use client';

import { useUserStore } from '@/lib/store';
import { useEffect } from 'react';

export function ClientDashboard({ initialData }) {
  const { setUser } = useUserStore();
  
  // Hydrate store with server data
  useEffect(() => {
    setUser(initialData);
  }, [initialData, setUser]);
  
  return <div>...</div>;
}
```

---

### Real-Time Updates (WebSocket/SSE)

```tsx
'use client';

import { useMessageStore } from '@/lib/store';
import { useEffect } from 'react';

export function RealtimeMessages() {
  const { addMessage, setTyping } = useMessageStore();
  
  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/messages');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'new_message') {
        addMessage(data.conversationId, data.message);
      }
      
      if (data.type === 'typing') {
        setTyping(data.conversationId, data.userId, data.isTyping);
      }
    };
    
    return () => ws.close();
  }, [addMessage, setTyping]);
  
  return <div>...</div>;
}
```

---

### API Integration

```tsx
'use client';

import { useUserStore } from '@/lib/store';

export function UpdateProfileButton() {
  const { user, updateProfile, setError, setLoading } = useUserStore();
  
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'New Name' }),
      });
      
      if (!response.ok) throw new Error('Update failed');
      
      const updatedUser = await response.json();
      updateProfile(updatedUser);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  return <button onClick={handleUpdate}>Update Profile</button>;
}
```

---

## Best Practices

### 1. **Use Selectors to Prevent Re-renders**

```tsx
// ❌ Bad: Component re-renders on ANY store change
const { user, messages, spells } = useUserStore();

// ✅ Good: Only re-renders when `user.name` changes
const userName = useUserStore((state) => state.user?.name);
```

### 2. **Keep Actions Outside Components**

```tsx
// ✅ Good: Actions don't cause re-renders
const { updateEnergyAlignment } = useUserStore();

useEffect(() => {
  updateEnergyAlignment(newValue);
}, [newValue, updateEnergyAlignment]);
```

### 3. **Use DevTools for Debugging**

Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools) to inspect store state and actions in real-time.

### 4. **Persist Only What's Needed**

The stores are configured to persist only essential data:
- `useMessageStore`: Conversations and unread counts (not full message history)
- `useUserStore`: User profile and energy history
- `useSpellQueueStore`: Not persisted (admin only, loads fresh)
- `useNotificationStore`: Not persisted (transient)

### 5. **Clear Sensitive Data on Logout**

```tsx
const handleLogout = () => {
  useUserStore.getState().logout();
  useMessageStore.getState().setConversations([]);
  // Redirect to login
};
```

---

## Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from '@/lib/store';

describe('useUserStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useUserStore.setState({
      user: null,
      isAuthenticated: false,
    });
  });

  it('should update energy alignment', () => {
    const { result } = renderHook(() => useUserStore());
    
    act(() => {
      result.current.setUser(mockUser);
      result.current.updateEnergyAlignment(75);
    });
    
    expect(result.current.user?.spiritualProfile.energyAlignment).toBe(75);
  });
});
```

---

## Performance Tips

1. **Lazy Load Stores**: Import stores only in client components that need them
2. **Use Shallow Comparison**: `useUserStore((state) => state.user, shallow)`
3. **Debounce Frequent Updates**: Use debounce for rapid state changes (e.g., typing)
4. **Batch Updates**: Combine multiple state changes when possible

---

## Next Steps

1. Create `components/notification-container.tsx` for toast display
2. Add real-time WebSocket integration for messages
3. Implement optimistic updates for better UX
4. Add analytics tracking on key store actions
5. Create custom hooks that combine multiple stores

---

## Questions?

Check the [Zustand documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) or review the store source code in `lib/store/`.
