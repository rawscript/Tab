# React Integration

Tab Authenticator provides seamless integration with React applications through context providers and custom hooks.

## Setting Up React Integration

### 1. Install the Package

```bash
npm install tab-authenticator
```

### 2. Wrap Your App with AuthProvider

The `AuthProvider` component provides authentication context to your entire application:

```jsx
// App.js
import React from 'react';
import { AuthProvider } from 'tab-authenticator/react';

function App() {
  const authConfig = {
    encryptionKey: 'your-encryption-key',
    provider: 'supabase',
    supabaseUrl: 'https://your-project.supabase.co',
    supabaseKey: 'your-anon-key'
  };

  return (
    <AuthProvider config={authConfig}>
      <YourAppRoutes />
    </AuthProvider>
  );
}

export default App;
```

## Using the useAuth Hook

The `useAuth` hook provides access to authentication state and methods throughout your component tree.

### Basic Usage

```jsx
import React from 'react';
import { useAuth } from 'tab-authenticator/react';

function UserProfile() {
  const { 
    isAuthenticated, 
    getCurrentUser, 
    isOffline,
    loading,
    error 
  } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (isAuthenticated()) {
    const user = getCurrentUser();
    return (
      <div>
        <h2>Welcome, {user.email}!</h2>
        <p>Status: {isOffline() ? 'Offline' : 'Online'}</p>
      </div>
    );
  }

  return <div>Please log in</div>;
}
```

### Authentication Methods

```jsx
import React, { useState } from 'react';
import { useAuth } from 'tab-authenticator/react';

function AuthForms() {
  const { login, signup, logout, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (!result.success) {
      alert(`Login failed: ${result.error}`);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await signup({ 
      email, 
      password, 
      profile: { name } 
    });
    if (!result.success) {
      alert(`Signup failed: ${result.error}`);
    }
  };

  return (
    <div>
      {isAuthenticated() ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
```

## Protected Routes

### Using Higher-Order Component

```jsx
import React from 'react';
import { withAuth } from 'tab-authenticator/react';

function Dashboard() {
  return <div>Protected dashboard content</div>;
}

export default withAuth(Dashboard);
```

### Using ProtectedRoute Component

```jsx
import React from 'react';
import { ProtectedRoute } from 'tab-authenticator/react';

function App() {
  return (
    <div>
      <nav>
        {/* Public routes */}
        <a href="/">Home</a>
      </nav>
      
      {/* Protected route */}
      <ProtectedRoute fallback={<div>Access denied. Please log in.</div>}>
        <div>
          <h1>Protected Content</h1>
          <Dashboard />
        </div>
      </ProtectedRoute>
    </div>
  );
}
```

## Advanced React Patterns

### Custom Protected Component

```jsx
import React from 'react';
import { useAuth } from 'tab-authenticator/react';

function ProtectedComponent({ children, fallback = <div>Access denied</div> }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated() ? children : fallback;
}

// Usage
function MyApp() {
  return (
    <ProtectedComponent fallback={<LoginForm />}>
      <Dashboard />
    </ProtectedComponent>
  );
}
```

### Authentication Status Indicator

```jsx
import React from 'react';
import { useAuth } from 'tab-authenticator/react';

function AuthStatus() {
  const { isAuthenticated, isOffline, getCurrentUser } = useAuth();

  const user = getCurrentUser();
  
  return (
    <div className="auth-status">
      {isAuthenticated() ? (
        <div>
          <span>👤 {user?.email}</span>
          <span className={isOffline() ? "offline" : "online"}>
            {isOffline() ? "🔴 Offline" : "🟢 Online"}
          </span>
        </div>
      ) : (
        <span>🔓 Not authenticated</span>
      )}
    </div>
  );
}
```

## Error Handling

```jsx
import React, { useEffect } from 'react';
import { useAuth } from 'tab-authenticator/react';

function ErrorBoundary() {
  const { error } = useAuth();

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
      // Log error to error reporting service
    }
  }, [error]);

  return null; // This component doesn't render anything
}
```

## Best Practices

1. **Always check loading state**: Authentication state takes time to initialize
2. **Handle offline status**: Provide appropriate UI when offline
3. **Secure sensitive data**: Don't expose sensitive information in the UI
4. **Use proper fallbacks**: Always provide fallback UI for protected content
5. **Clean up resources**: The provider handles cleanup automatically

## Migration from Other Libraries

If you're migrating from another authentication library, the pattern is similar to Auth0 React SDK or Firebase React hooks, making the transition smooth.