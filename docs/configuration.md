# Configuration

Tab Authenticator provides flexible configuration options to suit your application's needs.

## Basic Configuration

The library accepts a configuration object with the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `encryptionKey` | string | 'default-encryption-key' | Key used for encrypting sensitive data |
| `storagePrefix` | string | 'tab_auth_' | Prefix for local storage keys |
| `provider` | string | 'default' | Authentication provider to use ('supabase', 'firebase', 'auth0', 'default') |
| `syncInterval` | number | 30000 | Interval (ms) for syncing authentication state when online |
| `tokenExpiry` | number | 3600 | Token expiry time in seconds |

## Provider-Specific Configuration

### Supabase Configuration

```javascript
{
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key',
  encryptionKey: 'your-encryption-key'
}
```

### Firebase Configuration

```javascript
{
  provider: 'firebase',
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
  encryptionKey: 'your-encryption-key'
}
```

### Auth0 Configuration

```javascript
{
  provider: 'auth0',
  domain: 'your-domain.auth0.com',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  audience: 'your-audience',
  encryptionKey: 'your-encryption-key'
}
```

### Custom Provider Configuration

```javascript
{
  provider: 'default', // Use for custom providers
  apiUrl: 'https://your-auth-api.com',
  apiKey: 'your-api-key',
  encryptionKey: 'your-encryption-key'
}
```

## React Configuration

When using the React provider, pass the configuration object to the `AuthProvider`:

```jsx
<AuthProvider config={{
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
}}>
  <App />
</AuthProvider>
```

## Vanilla JavaScript Configuration

When using the vanilla JavaScript API, pass the configuration object to the constructor:

```javascript
const auth = new TabAuth({
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
});
```

## Advanced Configuration

### Offline Resources Configuration

You can specify which resources are available offline:

```javascript
{
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key',
  offlineResources: [
    '/api/local-data',
    '/api/cached-content',
    /\/api\/offline\/.*/
  ]
}
```

### Custom Sync Interval

Adjust how often the authentication state syncs when online:

```javascript
{
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key',
  syncInterval: 60000 // Sync every minute instead of every 30 seconds
}
```

## Environment-Specific Configuration

You can create different configurations for different environments:

```javascript
const config = process.env.NODE_ENV === 'production' 
  ? {
      encryptionKey: process.env.REACT_APP_ENCRYPTION_KEY,
      provider: 'supabase',
      supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
      supabaseKey: process.env.REACT_APP_SUPABASE_KEY
    }
  : {
      encryptionKey: 'dev-encryption-key',
      provider: 'supabase',
      supabaseUrl: 'https://dev-project.supabase.co',
      supabaseKey: 'dev-anon-key'
    };

// Use the config
<AuthProvider config={config}>
  <App />
</AuthProvider>
```