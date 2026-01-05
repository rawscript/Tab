/**
 * OnlineAuth - Online authentication system
 * Handles authentication with online services like Supabase
 */

class OnlineAuth {
  constructor(config = {}) {
    this.config = {
      provider: config.provider || 'default', // 'supabase', 'firebase', etc.
      apiUrl: config.apiUrl,
      apiKey: config.apiKey,
      encryptionKey: config.encryptionKey || 'default-encryption-key',
      storagePrefix: config.storagePrefix || 'tab_auth_',
      ...config
    };

    this.provider = this.initializeProvider();
    this.currentUser = null;
    this.currentToken = null;
  }

  /**
   * Initialize the authentication provider based on config
   * @private
   */
  initializeProvider() {
    switch (this.config.provider.toLowerCase()) {
      case 'supabase':
        return new SupabaseAdapter(this.config);
      case 'firebase':
        return new FirebaseAuthAdapter(this.config);
      case 'auth0':
        return new Auth0Adapter(this.config);
      default:
        return new DefaultOnlineAdapter(this.config);
    }
  }

  /**
   * Login with online credentials
   * @param {Object} credentials - Login credentials {email, password}
   * @returns {Promise<Object>} - Result with success status and user data
   */
  async login(credentials) {
    try {
      const result = await this.provider.login(credentials);
      
      if (result.success) {
        this.currentUser = result.user;
        this.currentToken = result.token || result.session?.access_token;
      }
      
      return result;
    } catch (error) {
      console.error('Online login error:', error);
      return {
        success: false,
        error: 'Failed to login: ' + error.message
      };
    }
  }

  /**
   * Signup with online service
   * @param {Object} credentials - User credentials {email, password, profile}
   * @returns {Promise<Object>} - Result with success status and user data
   */
  async signup(credentials) {
    try {
      const result = await this.provider.signup(credentials);
      
      if (result.success) {
        this.currentUser = result.user;
        this.currentToken = result.token || result.session?.access_token;
      }
      
      return result;
    } catch (error) {
      console.error('Online signup error:', error);
      return {
        success: false,
        error: 'Failed to signup: ' + error.message
      };
    }
  }

  /**
   * Logout from online service
   * @returns {Promise<Object>} - Result with success status
   */
  async logout() {
    try {
      const result = await this.provider.logout();
      
      this.currentUser = null;
      this.currentToken = null;
      
      return result;
    } catch (error) {
      console.error('Online logout error:', error);
      return {
        success: false,
        error: 'Failed to logout: ' + error.message
      };
    }
  }

  /**
   * Get current authenticated user
   * @returns {Object|null} - Current user object or null
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if a user is authenticated online
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    return !!this.currentUser && !!this.currentToken;
  }

  /**
   * Verify the current session with the online provider
   * @returns {Promise<Object|null>} - User object if session is valid, null otherwise
   */
  async verifySession() {
    try {
      if (!this.currentToken) {
        return null;
      }

      const result = await this.provider.verifySession(this.currentToken);
      
      if (result.success) {
        this.currentUser = result.user;
        return result.user;
      }
      
      return null;
    } catch (error) {
      console.error('Session verification error:', error);
      return null;
    }
  }

  /**
   * Refresh the current session token
   * @returns {Promise<Object>} - Result with success status and new token
   */
  async refreshToken() {
    try {
      if (!this.currentToken) {
        return {
          success: false,
          error: 'No token to refresh'
        };
      }

      const result = await this.provider.refreshToken(this.currentToken);
      
      if (result.success) {
        this.currentToken = result.token || result.session?.access_token;
      }
      
      return result;
    } catch (error) {
      console.error('Token refresh error:', error);
      return {
        success: false,
        error: 'Failed to refresh token: ' + error.message
      };
    }
  }

  /**
   * Request password reset
   * @param {string} email - Email to send reset link to
   * @returns {Promise<Object>} - Result with success status
   */
  async requestPasswordReset(email) {
    try {
      return await this.provider.requestPasswordReset(email);
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        error: 'Failed to request password reset: ' + error.message
      };
    }
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - Result with success status
   */
  async resetPassword(token, newPassword) {
    try {
      return await this.provider.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: 'Failed to reset password: ' + error.message
      };
    }
  }

  /**
   * Update user profile information
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - Result with success status
   */
  async updateProfile(updates) {
    try {
      if (!this.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }

      const result = await this.provider.updateProfile(this.currentUser.id, updates);
      
      if (result.success) {
        this.currentUser = { ...this.currentUser, ...updates };
      }
      
      return result;
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: 'Failed to update profile: ' + error.message
      };
    }
  }

  /**
   * Authenticate access to a specific resource
   * @param {string} resourceUrl - URL of the resource to access
   * @param {Object} user - User object
   * @returns {Promise<Object>} - Result with access status
   */
  async authenticateResource(resourceUrl, user) {
    try {
      return await this.provider.authenticateResource(resourceUrl, user);
    } catch (error) {
      console.error('Resource authentication error:', error);
      return {
        success: false,
        error: 'Failed to authenticate resource access: ' + error.message
      };
    }
  }

  /**
   * Get user's available permissions
   * @returns {Promise<Object>} - Permissions object
   */
  async getUserPermissions() {
    try {
      if (!this.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }

      return await this.provider.getUserPermissions(this.currentUser.id);
    } catch (error) {
      console.error('Get user permissions error:', error);
      return {
        success: false,
        error: 'Failed to get user permissions: ' + error.message
      };
    }
  }
}

// Base adapter class
class BaseAdapter {
  constructor(config) {
    this.config = config;
  }

  async login(credentials) {
    throw new Error('Login method must be implemented by subclass');
  }

  async signup(credentials) {
    throw new Error('Signup method must be implemented by subclass');
  }

  async logout() {
    throw new Error('Logout method must be implemented by subclass');
  }

  async verifySession(token) {
    throw new Error('VerifySession method must be implemented by subclass');
  }

  async refreshToken(token) {
    throw new Error('RefreshToken method must be implemented by subclass');
  }

  async requestPasswordReset(email) {
    throw new Error('RequestPasswordReset method must be implemented by subclass');
  }

  async resetPassword(token, newPassword) {
    throw new Error('ResetPassword method must be implemented by subclass');
  }

  async updateProfile(userId, updates) {
    throw new Error('UpdateProfile method must be implemented by subclass');
  }

  async authenticateResource(resourceUrl, user) {
    throw new Error('AuthenticateResource method must be implemented by subclass');
  }

  async getUserPermissions(userId) {
    throw new Error('GetUserPermissions method must be implemented by subclass');
  }
}

// Supabase adapter
class SupabaseAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    
    // Import Supabase client if available, otherwise use fetch
    this.supabaseUrl = config.supabaseUrl;
    this.supabaseKey = config.supabaseKey;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Try to import Supabase client
      const { createClient } = await import('@supabase/supabase-js');
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
      this.initialized = true;
    } catch (error) {
      console.warn('Supabase client not available, using fetch API instead');
      // Fallback to fetch-based implementation
      this.initialized = true;
    }
  }

  async login(credentials) {
    await this.initialize();
    
    try {
      if (this.supabase) {
        // Use Supabase client
        const { data, error } = await this.supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          user: this.formatUser(data.user),
          token: data.session?.access_token,
          session: data.session
        };
      } else {
        // Fallback to fetch
        const response = await fetch(`${this.supabaseUrl}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error?.message || 'Login failed');
        }

        return {
          success: true,
          user: this.formatUser(result.user),
          token: result.access_token,
          session: result
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
    await this.initialize();
    
    try {
      if (this.supabase) {
        // Use Supabase client
        const { data, error } = await this.supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
          options: {
            data: credentials.profile || {}
          }
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          user: this.formatUser(data.user),
          token: data.session?.access_token,
          session: data.session
        };
      } else {
        // Fallback to fetch
        const response = await fetch(`${this.supabaseUrl}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            data: credentials.profile || {}
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error?.message || 'Signup failed');
        }

        return {
          success: true,
          user: this.formatUser(result.user),
          token: result.access_token,
          session: result
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
    await this.initialize();
    
    try {
      if (this.supabase) {
        const { error } = await this.supabase.auth.signOut();
        if (error) {
          throw new Error(error.message);
        }
      } else {
        // For fetch implementation, we clear the token locally
        // Actual server-side logout would require additional endpoint
        localStorage.removeItem('supabase_token');
      }

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
    await this.initialize();
    
    try {
      if (this.supabase) {
        // Use Supabase client with token
        const { data, error } = await this.supabase.auth.getUser(token);
        
        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          user: this.formatUser(data.user)
        };
      } else {
        // Fallback to fetch with token
        const response = await fetch(`${this.supabaseUrl}/auth/v1/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'apikey': this.supabaseKey
          }
        });

        const user = await response.json();

        if (!response.ok) {
          throw new Error(user.error?.message || 'Session verification failed');
        }

        return {
          success: true,
          user: this.formatUser(user)
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  formatUser(user) {
    return {
      id: user.id,
      email: user.email,
      aud: user.aud,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      profile: user.user_metadata || user.app_metadata || {},
      online: true
    };
  }
}

// Firebase adapter (simplified)
class FirebaseAuthAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.apiKey = config.apiKey;
    this.authDomain = config.authDomain;
  }

  async login(credentials) {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Login failed');
      }

      return {
        success: true,
        user: this.formatUser(result),
        token: result.idToken
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async signup(credentials) {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Signup failed');
      }

      return {
        success: true,
        user: this.formatUser(result),
        token: result.idToken
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async logout() {
    // Firebase tokens are typically just cleared locally
    // Actual server-side revocation would require additional calls
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  async verifySession(token) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idToken: token
          })
        }
      );

      const result = await response.json();

      if (!response.ok || !result.users || result.users.length === 0) {
        throw new Error('Invalid session');
      }

      return {
        success: true,
        user: this.formatUser(result.users[0])
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  formatUser(userData) {
    return {
      id: userData.localId || userData.id,
      email: userData.email,
      emailVerified: userData.emailVerified || false,
      createdAt: userData.createdAt,
      lastLoginAt: userData.lastLoginAt,
      profile: userData,
      online: true
    };
  }
}

// Auth0 adapter (simplified)
class Auth0Adapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.domain = config.domain;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  async login(credentials) {
    try {
      const response = await fetch(`https://${this.domain}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'password',
          username: credentials.email,
          password: credentials.password,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          audience: `https://${this.domain}/api/v2/`,
          scope: 'openid profile email'
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error_description || 'Login failed');
      }

      return {
        success: true,
        user: await this.getUserInfo(result.access_token),
        token: result.access_token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async signup(credentials) {
    try {
      const response = await fetch(`https://${this.domain}/dbconnections/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: this.clientId,
          email: credentials.email,
          password: credentials.password,
          connection: 'Username-Password-Authentication',
          user_metadata: credentials.profile || {}
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.description || 'Signup failed');
      }

      // After signup, need to login to get token
      return await this.login(credentials);
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getUserInfo(accessToken) {
    try {
      const response = await fetch(`https://${this.domain}/userinfo`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const userInfo = await response.json();

      return {
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        nickname: userInfo.nickname,
        picture: userInfo.picture,
        profile: userInfo,
        online: true
      };
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }

  async verifySession(token) {
    try {
      const user = await this.getUserInfo(token);
      return {
        success: true,
        user: user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async logout() {
    // Auth0 logout typically involves clearing tokens locally
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
}

// Default adapter for custom providers
class DefaultOnlineAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
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

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      return {
        success: true,
        user: result.user,
        token: result.token
      };
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

      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      return {
        success: true,
        user: result.user,
        token: result.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async logout() {
    try {
      await fetch(`${this.apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

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
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Session verification failed');
      }

      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export { OnlineAuth, BaseAdapter };