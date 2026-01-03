/**
 * Example usage files for Tab Authentication
 */

// Example React component using the AuthProvider
export const ExampleReactComponent = () => {
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
      <h2>Tab Authentication Example</h2>
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
};

// Example of how to wrap your app with AuthProvider
export const AppWithAuth = () => {
  const authConfig = {
    encryptionKey: 'your-encryption-key',
    storagePrefix: 'myapp_auth_',
    provider: 'supabase', // or 'firebase', 'auth0', etc.
    supabaseUrl: 'https://your-project.supabase.co',
    supabaseKey: 'your-anon-key'
  };

  return (
    <AuthProvider config={authConfig}>
      <ExampleReactComponent />
    </AuthProvider>
  );
};

// Example vanilla JavaScript usage
export const exampleVanillaUsage = async () => {
  // Initialize TabAuth
  const auth = new TabAuth({
    encryptionKey: 'your-encryption-key',
    storagePrefix: 'myapp_auth_',
    provider: 'supabase',
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

  auth.on('networkChange', ({ isOnline, offline }) => {
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
  } else {
    console.error('Login failed:', loginResult.error);
  }

  // Check resource access
  const resourceResult = await auth.authenticateResource('https://api.example.com/data');
  if (resourceResult.success) {
    console.log('Resource access granted');
  } else {
    console.log('Resource access denied:', resourceResult.error);
  }
};

// Example of using the global window.TabAuth in HTML
export const exampleGlobalUsage = () => {
  // This would be used in an HTML file like:
  /*
  <script src="path/to/tab-auth.js"></script>
  <script>
    // Set up event listener
    TabAuth.on('login', function(user) {
      console.log('User logged in:', user);
    });

    // Perform login
    TabAuth.login({
      email: 'user@example.com',
      password: 'password123'
    }).then(function(result) {
      if (result.success) {
        console.log('Login successful');
      } else {
        console.error('Login failed:', result.error);
      }
    });
  </script>
  */
};

// Example of custom adapter implementation
export class CustomAuthProvider extends BaseAdapter {
  constructor(config) {
    super(config);
    this.apiUrl = config.customApiUrl;
    this.apiKey = config.customApiKey;
  }

  async login(credentials) {
    // Implement custom login logic
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        user: result.user,
        token: result.token
      };
    } else {
      return {
        success: false,
        error: result.message || 'Login failed'
      };
    }
  }

  async signup(credentials) {
    // Implement custom signup logic
    const response = await fetch(`${this.apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        user: result.user,
        token: result.token
      };
    } else {
      return {
        success: false,
        error: result.message || 'Signup failed'
      };
    }
  }

  async logout() {
    // Implement custom logout logic
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  async verifySession(token) {
    // Implement custom session verification
    const response = await fetch(`${this.apiUrl}/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-API-Key': this.apiKey
      }
    });

    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        user: result.user
      };
    } else {
      return {
        success: false,
        error: result.message || 'Session verification failed'
      };
    }
  }
}