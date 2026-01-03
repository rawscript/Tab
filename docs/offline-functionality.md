# Offline Functionality

Tab Authenticator provides comprehensive offline support, allowing users to access your application even when network connectivity is unavailable.

## Overview

The offline functionality includes:

- Local account creation and authentication
- Secure local storage of authentication data
- Automatic synchronization when network is restored
- Resource access control with appropriate notifications
- Seamless switching between online and offline modes

## How It Works

### 1. Automatic Mode Detection

Tab Authenticator automatically detects network status and switches between online and offline modes:

```javascript
// The library automatically detects network status
const { isOffline } = useAuth(); // React
// or
const isOffline = auth.isOffline(); // Vanilla JS
```

### 2. Local Authentication

When offline, the library uses local authentication:

- User credentials are securely stored locally
- Authentication works without network connection
- Data is encrypted using AES encryption

### 3. Sync When Online

When network connectivity is restored:

- The library attempts to sync local credentials with the online provider
- If successful, the user remains logged in with online credentials
- Local data is synchronized with the online service

## Creating Offline Accounts

Users can create accounts even when offline:

### React Example

```jsx
import React, { useState } from 'react';
import { useAuth } from 'tab-authenticator/react';

function OfflineSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, isOffline } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const result = await signup({
      email,
      password,
      profile: { name }
    });
    
    if (result.success) {
      alert('Account created successfully!');
      // User is now authenticated, even if offline
    } else {
      alert(`Signup failed: ${result.error}`);
    }
  };

  return (
    <div>
      {isOffline() && (
        <div style={{ color: 'orange' }}>
          Creating account in offline mode
        </div>
      )}
      
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
```

### Vanilla JavaScript Example

```javascript
import { TabAuth } from 'tab-authenticator';

const auth = new TabAuth({
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
});

// Create account offline
const signupResult = await auth.signup({
  email: 'user@example.com',
  password: 'securepassword',
  profile: {
    name: 'John Doe'
  }
});

if (signupResult.success) {
  console.log('Account created offline');
  console.log('User is authenticated:', auth.isAuthenticated());
  console.log('Current mode:', auth.isOffline() ? 'Offline' : 'Online');
}
```

## Resource Access Control

### Checking Resource Availability Offline

You can specify which resources are available offline:

```javascript
// Configuration with offline resources
const config = {
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key',
  offlineResources: [
    '/api/local-data',
    '/api/cached-content',
    /\/api\/offline\/.*/  // Regex pattern
  ]
};
```

### Authenticating Resources

```jsx
import { useAuth } from 'tab-authenticator/react';

function ProtectedResource() {
  const { authenticateResource, isOffline } = useAuth();
  const [resourceData, setResourceData] = useState(null);
  const [error, setError] = useState(null);

  const accessResource = async () => {
    const result = await authenticateResource('/api/protected-data');
    
    if (result.success) {
      // Access granted, fetch the resource
      const response = await fetch('/api/protected-data');
      const data = await response.json();
      setResourceData(data);
    } else {
      setError(result.error);
      
      if (result.offline && result.error.includes('requires online access')) {
        // Show appropriate message for offline users
        setError('This resource requires online access. Please connect to the internet.');
      }
    }
  };

  return (
    <div>
      {isOffline() && (
        <div className="offline-notice">
          Working in offline mode
        </div>
      )}
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      
      <button onClick={accessResource}>
        Access Protected Resource
      </button>
      
      {resourceData && (
        <div className="resource-data">
          {JSON.stringify(resourceData, null, 2)}
        </div>
      )}
    </div>
  );
}
```

## Handling Network Changes

### React Event Listeners

```jsx
import { useEffect } from 'react';
import { useAuth } from 'tab-authenticator/react';

function NetworkStatusHandler() {
  const { authOrchestrator } = useAuth();

  useEffect(() => {
    // Listen for network changes
    const removeListener = authOrchestrator.networkManager.addStatusListener((isOnline) => {
      if (isOnline) {
        console.log('Network connection restored');
        // Perform any sync operations if needed
      } else {
        console.log('Network connection lost');
        // Switch to offline mode UI
      }
    });

    // Cleanup listener on unmount
    return removeListener;
  }, [authOrchestrator]);

  return null; // This component doesn't render anything
}
```

### Vanilla JavaScript Event Listeners

```javascript
import { TabAuth } from 'tab-authenticator';

const auth = new TabAuth(config);

// Add network change listener
const removeListener = auth.on('networkChange', ({ isOnline, offline }) => {
  console.log(`Network status changed: ${isOnline ? 'Online' : 'Offline'}`);
  
  if (isOnline) {
    console.log('Attempting to sync authentication state...');
    // The library handles sync automatically, but you can perform custom actions
  }
});

// Later, to remove the listener
// removeListener();
```

## Security Considerations

### Encryption

All local authentication data is encrypted using AES encryption:

```javascript
// The encryption key should be kept secure
const config = {
  encryptionKey: process.env.REACT_APP_ENCRYPTION_KEY || 'your-secure-key'
};
```

### Data Storage

- Authentication tokens are stored securely in local storage
- Passwords are never stored in plain text
- All sensitive data is encrypted before storage

## Best Practices

1. **Inform users about offline mode**: Clearly indicate when the application is working offline
2. **Cache important data**: Store frequently accessed data locally for offline use
3. **Design for offline-first**: Consider how your application should work without network connectivity
4. **Handle sync gracefully**: Provide feedback when syncing data after reconnection
5. **Secure offline data**: Use strong encryption for sensitive offline data
6. **Validate resource access**: Check if resources are available offline before attempting access

## Troubleshooting

### Common Issues

**Issue**: User created account offline but can't access online features when online
**Solution**: Ensure the sync process is working properly and check network connectivity

**Issue**: Offline mode not detected properly
**Solution**: Verify network detection is working and check browser online/offline events

**Issue**: Data not syncing when network is restored
**Solution**: Check authentication provider configuration and network connectivity