# API Reference

This section provides detailed information about the API methods and properties available in Tab Authenticator.

## React API

### `AuthProvider`

The React context provider component that manages authentication state.

#### Props

- `config` (object, required): Configuration object for the authentication orchestrator

#### Example

```jsx
<AuthProvider config={authConfig}>
  <App />
</AuthProvider>
```

### `useAuth()`

React hook that provides access to authentication state and methods.

#### Returns

- `loading` (boolean): Indicates if authentication state is loading
- `isAuthenticated()` (function): Returns true if user is authenticated
- `getCurrentUser()` (function): Returns the current user object
- `isOffline()` (function): Returns true if in offline mode
- `login(credentials)` (function): Logs in a user with credentials
- `signup(credentials)` (function): Creates a new user account
- `logout()` (function): Logs out the current user
- `authenticateResource(resourceUrl)` (function): Checks access to a resource
- `authOrchestrator` (object): Direct access to the underlying orchestrator instance

#### Example

```jsx
import { useAuth } from 'tab-authenticator/react';

function MyComponent() {
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
  
  // Use the methods...
}
```

### `withAuth(Component)`

Higher-order component for protecting routes.

#### Parameters

- `Component` (React Component): The component to wrap

#### Example

```jsx
import { withAuth } from 'tab-authenticator/react';

const ProtectedComponent = withAuth(MyComponent);
```

### `ProtectedRoute`

React component for protecting routes declaratively.

#### Props

- `children` (React Node): Child components to render when authenticated
- `fallback` (React Node, optional): Component to render when not authenticated (default: `<div>Access denied</div>`)

#### Example

```jsx
import { ProtectedRoute } from 'tab-authenticator/react';

function App() {
  return (
    <ProtectedRoute fallback={<div>Please log in</div>}>
      <div>Protected content</div>
    </ProtectedRoute>
  );
}
```

## Vanilla JavaScript API

### `TabAuth` Class

The main class for vanilla JavaScript usage.

#### Constructor

```javascript
new TabAuth(config)
```

- `config` (object): Configuration object

#### Methods

##### `login(credentials)`

Authenticate a user with credentials.

- Parameters: 
  - `credentials` (object): User credentials with email and password
- Returns: `Promise<Object>` with success status and user data

##### `signup(credentials)`

Create a new user account.

- Parameters:
  - `credentials` (object): User credentials with email, password, and optional profile
- Returns: `Promise<Object>` with success status and user data

##### `logout()`

Log out the current user.

- Returns: `Promise<Object>` with success status

##### `isAuthenticated()`

Check if a user is authenticated.

- Returns: `boolean`

##### `getCurrentUser()`

Get the current user object.

- Returns: `Object|null`

##### `isOffline()`

Check if the application is in offline mode.

- Returns: `boolean`

##### `authenticateResource(resourceUrl)`

Check if the user has access to a specific resource.

- Parameters:
  - `resourceUrl` (string): URL of the resource to check
- Returns: `Promise<Object>` with access status

##### `on(event, callback)`

Add an event listener.

- Parameters:
  - `event` (string): Event name ('login', 'logout', 'networkChange', 'error')
  - `callback` (function): Function to call when event occurs
- Returns: `function` to remove the listener

##### `getAuthOrchestrator()`

Get direct access to the underlying authentication orchestrator.

- Returns: `AuthOrchestrator` instance

##### `destroy()`

Clean up the instance and remove all listeners.

- Returns: `void`

#### Example

```javascript
import { TabAuth } from 'tab-authenticator';

const auth = new TabAuth({
  encryptionKey: 'your-encryption-key',
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key'
});

// Use the methods...
```

## Global API

When included via CDN, Tab Authenticator is available globally as `window.TabAuth`.

### Properties

- `create(config)`: Creates a new TabAuth instance
- `get(config)`: Gets or creates a singleton instance
- `login(credentials)`: Performs login with credentials
- `signup(credentials)`: Creates a new account
- `logout()`: Logs out the current user
- `isAuthenticated()`: Checks authentication status
- `getCurrentUser()`: Gets the current user
- `isOffline()`: Checks if offline
- `authenticateResource(resourceUrl)`: Checks resource access
- `on(event, callback)`: Adds an event listener

### Example

```html
<script src="https://unpkg.com/tab-authenticator/dist/index.umd.js"></script>
<script>
  // Using the global API
  TabAuth.login({
    email: 'user@example.com',
    password: 'password123'
  }).then(result => {
    if (result.success) {
      console.log('Login successful');
    }
  });
</script>
```