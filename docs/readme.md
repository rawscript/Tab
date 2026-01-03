# Tab Authenticator

Tab Authenticator is a comprehensive authentication solution that provides universal authentication orchestration with seamless online/offline support.

## Features

- **Universal Authentication**: Works with multiple providers (Supabase, Firebase, Auth0, custom)
- **Online/Offline Support**: Automatic switching between online and offline modes
- **Secure Encryption**: AES encryption for sensitive data
- **Local Storage**: Caching with synchronization capabilities
- **React Support**: Context provider and hooks for React applications
- **Vanilla JS Support**: Works in any JavaScript environment
- **Automatic Sync**: Syncs authentication state when network is restored

## Quick Installation

```bash
npm install tab-authenticator
```

## Quick Start

### For React Applications

```jsx
import React from 'react';
import { AuthProvider, useAuth } from 'tab-authenticator/react';

function App() {
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
}

function YourComponent() {
  const { login, isAuthenticated, getCurrentUser, isOffline } = useAuth();
  
  // Use authentication methods...
}
```

### For Vanilla JavaScript

```javascript
import { TabAuth } from 'tab-authenticator';

const auth = new TabAuth({
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
});

// Use authentication methods...
const result = await auth.login({ email: 'user@example.com', password: 'password' });
```

## Documentation Structure

- [Installation](installation.md) - How to install and set up the library
- [Quick Start](quick-start.md) - Getting started with basic usage
- [Configuration](configuration.md) - Detailed configuration options
- [API Reference](api-reference.md) - Complete API documentation
- [React Integration](react-integration.md) - React-specific usage
- [Offline Functionality](offline-functionality.md) - Working with offline authentication
- [Security](security.md) - Security measures and best practices
- [Troubleshooting](troubleshooting.md) - Common issues and solutions
- [Examples](examples.md) - Practical implementation examples

## Support

For support, please check the [troubleshooting](troubleshooting.md) section first. If you encounter issues not covered there, please open an issue in the repository.

## Contributing

We welcome contributions to Tab Authenticator. Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.