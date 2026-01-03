# Examples

This document provides practical examples of how to use Tab Authenticator in various scenarios.

## Basic Authentication

### React Login Component

```jsx
import React, { useState } from 'react';
import { useAuth } from 'tab-authenticator/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated, getCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login({ email, password });
      if (!result.success) {
        alert(`Login failed: ${result.error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated()) {
    const user = getCurrentUser();
    return (
      <div>
        <h2>Welcome back, {user.email}!</h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;
```

### React Signup Component

```jsx
import React, { useState } from 'react';
import { useAuth } from 'tab-authenticator/react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await signup({
        email,
        password,
        profile: {
          firstName,
          lastName
        }
      });
      
      if (result.success) {
        alert('Account created successfully!');
      } else {
        alert(`Signup failed: ${result.error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}

export default Signup;
```

## Advanced Authentication Patterns

### Protected Route Component

```jsx
import React from 'react';
import { useAuth } from 'tab-authenticator/react';

function ProtectedRoute({ children, fallback = <div>Access denied</div> }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated() ? children : fallback;
}

// Usage
function App() {
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
      </nav>
      
      <main>
        <ProtectedRoute fallback={<LoginForm />}>
          <Dashboard />
        </ProtectedRoute>
      </main>
    </div>
  );
}
```

### Authentication Status Component

```jsx
import React from 'react';
import { useAuth } from 'tab-authenticator/react';

function AuthStatus() {
  const { 
    isAuthenticated, 
    getCurrentUser, 
    isOffline, 
    loading 
  } = useAuth();

  if (loading) {
    return <div className="auth-status">Checking authentication...</div>;
  }

  if (isAuthenticated()) {
    const user = getCurrentUser();
    return (
      <div className="auth-status">
        <span className="user-info">
          👤 {user.email}
        </span>
        <span className={`connection-status ${isOffline() ? 'offline' : 'online'}`}>
          {isOffline() ? '🔴 Offline' : '🟢 Online'}
        </span>
      </div>
    );
  }

  return (
    <div className="auth-status">
      <span>🔓 Not authenticated</span>
    </div>
  );
}
```

## Vanilla JavaScript Examples

### Basic Authentication Flow

```javascript
import { TabAuth } from 'tab-authenticator';

class AuthService {
  constructor() {
    this.auth = new TabAuth({
      encryptionKey: 'your-encryption-key',
      provider: 'supabase',
      supabaseUrl: 'https://your-project.supabase.co',
      supabaseKey: 'your-anon-key'
    });
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.auth.on('login', (user) => {
      console.log('User logged in:', user);
      this.updateUI('login', user);
    });

    this.auth.on('logout', () => {
      console.log('User logged out');
      this.updateUI('logout');
    });

    this.auth.on('networkChange', ({ isOnline }) => {
      console.log(`Network status: ${isOnline ? 'Online' : 'Offline'}`);
      this.updateNetworkStatus(isOnline);
    });
  }

  async login(email, password) {
    try {
      const result = await this.auth.login({ email, password });
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  async signup(email, password, profile = {}) {
    try {
      const result = await this.auth.signup({ email, password, profile });
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  }

  async logout() {
    try {
      const result = await this.auth.logout();
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }

  // Helper methods for UI updates
  updateUI(event, data) {
    // Update your UI based on authentication events
    document.dispatchEvent(new CustomEvent('authUpdate', { detail: { event, data } }));
  }

  updateNetworkStatus(isOnline) {
    // Update your UI based on network status
    document.body.classList.toggle('offline', !isOnline);
  }
}

// Usage
const authService = new AuthService();

// Example usage in your application
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const result = await authService.login(email, password);
  
  if (result.success) {
    console.log('Login successful');
    // Redirect or update UI
  } else {
    console.error('Login failed:', result.error);
    // Show error to user
  }
});
```

## Offline-First Application

### Caching Strategy

```javascript
import { TabAuth } from 'tab-authenticator';

class OfflineFirstApp {
  constructor() {
    this.auth = new TabAuth({
      encryptionKey: 'your-encryption-key',
      provider: 'supabase',
      supabaseUrl: 'https://your-project.supabase.co',
      supabaseKey: 'your-anon-key',
      offlineResources: [
        '/api/user-data',
        '/api/preferences',
        /\/api\/posts\/.*/
      ]
    });
    
    this.cache = new Map(); // In-memory cache
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.auth.on('networkChange', async ({ isOnline }) => {
      if (isOnline) {
        await this.syncOfflineData();
      }
    });
  }

  async fetchUserData() {
    // Check if we have cached data
    if (this.cache.has('userData')) {
      return this.cache.get('userData');
    }

    // Try to fetch from network
    if (!this.auth.isOffline()) {
      try {
        const response = await fetch('/api/user-data');
        const data = await response.json();
        
        // Cache the data
        this.cache.set('userData', data);
        return data;
      } catch (error) {
        console.error('Failed to fetch user data, falling back to cached or offline data');
      }
    }

    // If offline or fetch failed, try to return offline data
    // Implementation depends on your offline data storage strategy
    return this.getOfflineUserData();
  }

  async syncOfflineData() {
    // Implement logic to sync any offline changes when network is restored
    console.log('Syncing offline data...');
    // Add your sync logic here
  }

  getOfflineUserData() {
    // Return offline user data if available
    // This could come from local storage, IndexedDB, etc.
    return null;
  }
}
```

## Custom Provider Implementation

### Implementing a Custom Provider

```javascript
import { BaseAdapter } from 'tab-authenticator';

class CustomAuthProvider extends BaseAdapter {
  constructor(config) {
    super(config);
    this.apiUrl = config.customApiUrl;
    this.apiKey = config.customApiKey;
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: this.formatUser(result.user),
          token: result.token
        };
      } else {
        return {
          success: false,
          error: result.message || 'Login failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async signup(credentials) {
    try {
      const response = await fetch(`${this.apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: this.formatUser(result.user),
          token: result.token
        };
      } else {
        return {
          success: false,
          error: result.message || 'Signup failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async logout() {
    try {
      // Implement logout logic
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async verifySession(token) {
    try {
      const response = await fetch(`${this.apiUrl}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: this.formatUser(result.user)
        };
      } else {
        return {
          success: false,
          error: result.message || 'Session verification failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  formatUser(userData) {
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      profile: userData.profile || {},
      online: true
    };
  }
}

// Usage with the custom provider
const auth = new TabAuth({
  encryptionKey: 'your-encryption-key',
  provider: 'custom', // This tells the library to use your custom provider
  customApiUrl: 'https://your-custom-auth.com',
  customApiKey: 'your-api-key'
});
```

## Testing Examples

### Unit Testing with Jest

```javascript
// auth.test.js
import { TabAuth } from 'tab-authenticator';

// Mock the dependencies
jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn((data) => `encrypted_${data}`),
    decrypt: jest.fn((data) => data.replace('encrypted_', ''))
  },
  PBKDF2: jest.fn(() => ({ toString: () => 'mock_hash' }))
}));

describe('TabAuth', () => {
  let auth;

  beforeEach(() => {
    auth = new TabAuth({
      encryptionKey: 'test-key',
      provider: 'default'
    });
  });

  afterEach(() => {
    if (auth) {
      auth.destroy();
    }
  });

  test('should authenticate user with valid credentials', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    // Mock the login behavior
    auth.localAuth.login = jest.fn().mockResolvedValue({
      success: true,
      user: { email: 'test@example.com' }
    });

    const result = await auth.login(credentials);

    expect(result.success).toBe(true);
    expect(result.user.email).toBe('test@example.com');
  });

  test('should reject invalid credentials', async () => {
    const credentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    };

    // Mock the login behavior
    auth.localAuth.login = jest.fn().mockResolvedValue({
      success: false,
      error: 'Invalid credentials'
    });

    const result = await auth.login(credentials);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid credentials');
  });
});
```

These examples demonstrate various ways to implement authentication in your applications using Tab Authenticator, from basic login forms to advanced offline-first applications and custom provider implementations.