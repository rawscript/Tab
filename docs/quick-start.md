# Quick Start

Get up and running with Tab Authenticator in just a few steps.

## For React Applications

### 1. Wrap Your App with AuthProvider

```jsx
import React from 'react';
import { AuthProvider } from 'tab-authenticator/react';

function App() {
  const authConfig = {
    encryptionKey: 'your-encryption-key',
    provider: 'supabase', // or 'firebase', 'auth0', 'default'
    supabaseUrl: 'https://your-project.supabase.co',
    supabaseKey: 'your-anon-key'
  };

  return (
    <AuthProvider config={authConfig}>
      {/* Your application components */}
      <YourAppContent />
    </AuthProvider>
  );
}

export default App;
```

### 2. Use Authentication in Components

```jsx
import React from 'react';
import { useAuth } from 'tab-authenticator/react';

function LoginComponent() {
  const { 
    login, 
    signup, 
    logout, 
    isAuthenticated, 
    getCurrentUser, 
    isOffline,
    loading,
    error 
  } = useAuth();

  const handleLogin = async () => {
    const credentials = {
      email: 'user@example.com',
      password: 'password123'
    };

    const result = await login(credentials);
    if (!result.success) {
      console.error('Login failed:', result.error);
    }
  };

  const handleSignup = async () => {
    const credentials = {
      email: 'newuser@example.com',
      password: 'password123',
      profile: {
        firstName: 'John',
        lastName: 'Doe'
      }
    };

    const result = await signup(credentials);
    if (!result.success) {
      console.error('Signup failed:', result.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {isOffline() && <div style={{ color: 'orange' }}>Working offline</div>}
      
      {isAuthenticated() ? (
        <div>
          <p>Welcome, {getCurrentUser()?.email}!</p>
          <p>Status: {isOffline() ? 'Offline' : 'Online'}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default LoginComponent;
```

## For Vanilla JavaScript

### 1. Initialize the Authenticator

```javascript
import { TabAuth } from 'tab-authenticator';

// Initialize authentication
const auth = new TabAuth({
  encryptionKey: 'your-encryption-key',
  provider: 'supabase', // or 'firebase', 'auth0', 'default'
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
});

// Set up event listeners
auth.on('login', (user) => {
  console.log('User logged in:', user);
});

auth.on('logout', () => {
  console.log('User logged out');
});

auth.on('networkChange', ({ isOnline }) => {
  console.log(`Network status: ${isOnline ? 'Online' : 'Offline'}`);
});

// Perform authentication
const loginResult = await auth.login({
  email: 'user@example.com',
  password: 'password123'
});

if (loginResult.success) {
  console.log('Login successful');
  console.log('Current user:', auth.getCurrentUser());
  console.log('Is authenticated:', auth.isAuthenticated());
  console.log('Is offline:', auth.isOffline());
}
```

## Next Steps

- Learn about [Configuration Options](configuration.md)
- Explore the [API Reference](api-reference.md)
- Understand [Offline Functionality](offline-functionality.md)