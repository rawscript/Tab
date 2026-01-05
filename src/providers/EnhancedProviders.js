/**
 * Enhanced Provider Adapters
 * Additional authentication providers beyond the basic ones
 */

import { BaseAdapter } from '../core/OnlineAuth';

// AWS Cognito Adapter
class AWSCognitoAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.region = config.region;
    this.userPoolId = config.userPoolId;
    this.clientId = config.clientId;
    this.identityPoolId = config.identityPoolId;
    this.cognitoDomain = config.cognitoDomain; // Optional: for hosted UI
  }

  async login(credentials) {
    try {
      // AWS Cognito login using Amplify-style approach
      const response = await fetch(`https://cognito-idp.${this.region}.amazonaws.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
        },
        body: JSON.stringify({
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: this.clientId,
          AuthParameters: {
            USERNAME: credentials.email,
            PASSWORD: credentials.password
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      return {
        success: true,
        user: this.formatUser(result.AuthenticationResult),
        token: result.AuthenticationResult.AccessToken,
        refreshToken: result.AuthenticationResult.RefreshToken
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
      const response = await fetch(`https://cognito-idp.${this.region}.amazonaws.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp'
        },
        body: JSON.stringify({
          ClientId: this.clientId,
          Username: credentials.email,
          Password: credentials.password,
          UserAttributes: [
            { Name: 'email', Value: credentials.email },
            ...(credentials.profile ? [
              { Name: 'name', Value: credentials.profile.name || credentials.profile.firstName + ' ' + credentials.profile.lastName }
            ] : [])
          ]
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      return {
        success: true,
        user: this.formatUser(result),
        token: null // Need to confirm user before getting tokens
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async logout() {
    // AWS Cognito logout involves clearing tokens
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  async verifySession(token) {
    try {
      const response = await fetch(`https://cognito-idp.${this.region}.amazonaws.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser'
        },
        body: JSON.stringify({
          AccessToken: token
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Session verification failed');
      }

      return {
        success: true,
        user: this.formatUser(result)
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
      id: userData.Username || userData.UserSub,
      email: userData.UserAttributes?.find(attr => attr.Name === 'email')?.Value || userData.email,
      name: userData.UserAttributes?.find(attr => attr.Name === 'name')?.Value || userData.name,
      profile: userData.UserAttributes?.reduce((acc, attr) => {
        acc[attr.Name] = attr.Value;
        return acc;
      }, {}) || {},
      provider: 'aws-cognito',
      online: true
    };
  }
}

// Okta Adapter
class OktaAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.domain = config.domain; // e.g., 'dev-123456.okta.com'
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.scopes = config.scopes || ['openid', 'email', 'profile'];
  }

  async login(credentials) {
    try {
      // Okta direct authentication
      const response = await fetch(`https://${this.domain}/api/v1/authn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errorSummary || 'Login failed');
      }

      // If successful, exchange for OAuth tokens
      const tokenResponse = await this.getOAuthTokens(credentials);
      if (tokenResponse.success) {
        return {
          success: true,
          user: await this.getUserInfo(tokenResponse.token),
          ...tokenResponse
        };
      } else {
        return tokenResponse;
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getOAuthTokens(credentials) {
    try {
      const body = new URLSearchParams({
        grant_type: 'password',
        username: credentials.email,
        password: credentials.password,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: this.scopes.join(' ')
      });

      const response = await fetch(`https://${this.domain}/oauth2/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error_description || 'Token exchange failed');
      }

      return {
        success: true,
        token: result.access_token,
        refreshToken: result.refresh_token,
        expiresIn: result.expires_in
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
      // Create user in Okta
      const response = await fetch(`https://${this.domain}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `SSWS ${this.clientSecret}` // Requires API token
        },
        body: JSON.stringify({
          profile: {
            firstName: credentials.profile?.firstName || credentials.email.split('@')[0],
            lastName: credentials.profile?.lastName || 'User',
            email: credentials.email,
            login: credentials.email
          },
          credentials: {
            password: {
              value: credentials.password
            }
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errorSummary || 'Signup failed');
      }

      // After creating user, they need to be activated and can then login
      return {
        success: true,
        message: 'User created successfully. Please check your email to activate your account.',
        user: this.formatUser(result)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async logout() {
    // Okta logout would involve revoking tokens
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  async verifySession(token) {
    try {
      const response = await fetch(`https://${this.domain}/oauth2/v1/userinfo`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userInfo = await response.json();

      if (!response.ok) {
        throw new Error('Session verification failed');
      }

      return {
        success: true,
        user: this.formatUser(userInfo)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getUserInfo(accessToken) {
    try {
      const response = await fetch(`https://${this.domain}/oauth2/v1/userinfo`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const userInfo = await response.json();

      return this.formatUser(userInfo);
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }

  formatUser(userData) {
    return {
      id: userData.sub || userData.id,
      email: userData.email || userData.profile?.email,
      name: userData.name || `${userData.profile?.firstName || ''} ${userData.profile?.lastName || ''}`.trim(),
      profile: {
        firstName: userData.given_name || userData.profile?.firstName,
        lastName: userData.family_name || userData.profile?.lastName,
        email: userData.email || userData.profile?.email
      },
      provider: 'okta',
      online: true
    };
  }
}

// Azure Active Directory Adapter
class AzureADAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.tenantId = config.tenantId;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.scopes = config.scopes || ['User.Read'];
  }

  async login(credentials) {
    try {
      const body = new URLSearchParams({
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: `https://graph.microsoft.com/${this.scopes.join(' ')}`,
        username: credentials.email,
        password: credentials.password
      });

      const response = await fetch(`https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error_description || 'Login failed');
      }

      return {
        success: true,
        user: await this.getUserInfo(result.access_token),
        token: result.access_token,
        refreshToken: result.refresh_token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async signup(credentials) {
    // Azure AD typically doesn't allow self-service signup
    // This would require admin access or Azure AD B2C
    return {
      success: false,
      error: 'Direct signup not supported. Please contact your administrator.'
    };
  }

  async logout() {
    // Azure AD logout involves clearing tokens
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  async verifySession(token) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userInfo = await response.json();

      if (!response.ok) {
        throw new Error('Session verification failed');
      }

      return {
        success: true,
        user: this.formatUser(userInfo)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getUserInfo(accessToken) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const userInfo = await response.json();

      return this.formatUser(userInfo);
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }

  formatUser(userData) {
    return {
      id: userData.id,
      email: userData.mail || userData.userPrincipalName,
      name: userData.displayName,
      profile: {
        firstName: userData.givenName,
        lastName: userData.surname,
        email: userData.mail || userData.userPrincipalName,
        jobTitle: userData.jobTitle,
        department: userData.department
      },
      provider: 'azure-ad',
      online: true
    };
  }
}

export { 
  AWSCognitoAdapter, 
  OktaAdapter, 
  AzureADAdapter 
};