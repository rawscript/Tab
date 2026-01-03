# Tab Authentication Library

A universal authentication orchestrator that handles both online and offline authentication seamlessly.

## Features

- **Universal Authentication**: Works with various providers (Supabase, Firebase, Auth0, custom)
- **Online/Offline Support**: Automatic switching between online and offline modes
- **Secure Encryption**: AES encryption for sensitive data
- **Local Storage**: Caching with localforage for offline availability
- **React Support**: Context provider and hooks for React applications
- **Vanilla JS Support**: Works in any JavaScript environment
- **Automatic Sync**: Syncs authentication state when network is restored

## Installation

```bash
npm install @tab/auth
```

## Quick Start

### React Application

```jsx
import React from 'react';
import { AuthProvider, useAuth } from '@tab/auth/react';

// Wrap your app with AuthProvider
const App = () => {
  const authConfig = {
    encryptionKey: 'your-encryption-key',
    provider: 'supabase',
    supabaseUrl: 'https://your-project.supabase.co',
    supabaseKey: 'your-anon-key'
  };

  return (
    <AuthProvider config={authConfig}>
      <YourApp />
    </AuthProvider>
  );
};

// Use authentication in your components
const LoginComponent = () => {
  const { login, isAuthenticated, getCurrentUser, loading, error } = useAuth();

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {isAuthenticated() ? (
        <div>Welcome, {getCurrentUser()?.email}!</div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### Vanilla JavaScript

```javascript
import { TabAuth } from '@tab/auth';

// Initialize authentication
const auth = new TabAuth({
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
});

// Set up event listeners
auth.on('login', (user) => {
  console.log('User logged in:', user);
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
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `encryptionKey` | string | 'default-encryption-key' | Key used for encrypting sensitive data |
| `storagePrefix` | string | 'tab_auth_' | Prefix for local storage keys |
| `provider` | string | 'default' | Authentication provider ('supabase', 'firebase', 'auth0', 'default') |
| `syncInterval` | number | 30000 | Interval (ms) for syncing authentication state |
| `tokenExpiry` | number | 3600 | Token expiry time in seconds |

### Provider-Specific Options

#### Supabase
```javascript
{
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
}
```

#### Firebase
```javascript
{
  provider: 'firebase',
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com'
}
```

#### Auth0
```javascript
{
  provider: 'auth0',
  domain: 'your-domain.auth0.com',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
}
```

## API Reference

### AuthOrchestrator

The main authentication orchestrator class.

#### Methods

- `login(credentials)` - Authenticate user with credentials
- `signup(credentials)` - Create new user account
- `logout()` - Log out current user
- `isAuthenticated()` - Check if user is authenticated
- `getCurrentUser()` - Get current user object
- `isOffline()` - Check if in offline mode
- `authenticateResource(resourceUrl)` - Check access to resource
- `destroy()` - Clean up the orchestrator

### React Hooks and Components

#### `useAuth()`

React hook that provides authentication state and methods.

Returns:
- `loading` - Boolean indicating if auth state is loading
- `isAuthenticated` - Function to check auth status
- `getCurrentUser` - Function to get current user
- `isOffline` - Function to check offline status
- `login(credentials)` - Function to log in user
- `signup(credentials)` - Function to sign up user
- `logout()` - Function to log out user
- `authenticateResource(resourceUrl)` - Function to authenticate resource access

#### `<AuthProvider>`

React context provider component.

Props:
- `config` - Configuration object for the auth orchestrator

### Vanilla JavaScript API

#### `TabAuth` class

The main class for vanilla JavaScript usage.

Methods are similar to AuthOrchestrator but with event system support.

#### Global `window.TabAuth`

When included via script tag, available as `window.TabAuth`.

## Offline Functionality

The library provides seamless offline functionality:

1. **Automatic Mode Switching**: When network is lost, automatically switches to offline mode
2. **Local Account Creation**: Users can create accounts even when offline
3. **Local Authentication**: Login works with locally stored credentials
4. **Sync on Reconnection**: When network is restored, syncs with online provider
5. **Resource Access Control**: Shows appropriate messages when resources require online access

## Security Features

- AES encryption for sensitive authentication data
- PBKDF2 password hashing
- JWT-like tokens with expiration
- Secure random string generation
- Protection against common authentication vulnerabilities

## Custom Providers

You can implement custom authentication providers by extending the BaseAdapter:

```javascript
import { BaseAdapter } from '@tab/auth';

class CustomAuthProvider extends BaseAdapter {
  constructor(config) {
    super(config);
    this.apiUrl = config.customApiUrl;
  }

  async login(credentials) {
    // Implement custom login logic
  }

  async signup(credentials) {
    // Implement custom signup logic
  }

  // ... implement other required methods
}
```

## Browser Support

- Modern browsers with ES6+ support
- Local storage support required for offline functionality
- Fetch API support for network requests

## License

MIT