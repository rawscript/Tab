/**
 * React context and hooks for Tab Authentication
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AuthOrchestrator from '../index';

// Create context
const AuthContext = createContext();

// Auth reducer to manage state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload.user,
        offline: action.payload.offline || false
      };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload.error };
    case 'LOGOUT':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        user: null,
        offline: false
      };
    case 'SET_OFFLINE':
      return { ...state, offline: true };
    case 'SET_ONLINE':
      return { ...state, offline: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload.error };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider = ({ children, config = {} }) => {
  const [authOrchestrator, setAuthOrchestrator] = React.useState(null);
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
    isAuthenticated: false,
    user: null,
    offline: false,
    error: null
  });

  // Initialize the auth orchestrator
  useEffect(() => {
    const initAuth = async () => {
      try {
        const orchestrator = new AuthOrchestrator(config);
        await orchestrator.initialize();
        
        setAuthOrchestrator(orchestrator);
        
        // Set initial state based on current user
        const currentUser = orchestrator.getCurrentUser();
        if (currentUser) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: currentUser,
              offline: currentUser.offline || false
            }
          });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
        
        // Set network status
        if (orchestrator.isOffline()) {
          dispatch({ type: 'SET_OFFLINE' });
        } else {
          dispatch({ type: 'SET_ONLINE' });
        }
        
        // Add network status listener
        const removeListener = orchestrator.networkManager.addStatusListener((isOnline) => {
          if (isOnline) {
            dispatch({ type: 'SET_ONLINE' });
          } else {
            dispatch({ type: 'SET_OFFLINE' });
          }
        });
        
        // Cleanup function
        return () => {
          removeListener();
          if (orchestrator) {
            orchestrator.destroy();
          }
        };
      } catch (error) {
        console.error('Failed to initialize auth orchestrator:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: { error: 'Failed to initialize authentication' }
        });
      } finally {
        dispatch({ type: 'LOGIN_START' }); // This is just to set loading to false
        dispatch({ type: state.isAuthenticated ? 'LOGIN_SUCCESS' : 'LOGOUT' });
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    if (!authOrchestrator) return { success: false, error: 'Auth not initialized' };
    
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const result = await authOrchestrator.login(credentials);
      
      if (result.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: result.user,
            offline: result.user?.offline || false
          }
        });
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: { error: result.error }
        });
      }
      
      return result;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: { error: error.message }
      });
      return { success: false, error: error.message };
    }
  };

  // Signup function
  const signup = async (credentials) => {
    if (!authOrchestrator) return { success: false, error: 'Auth not initialized' };
    
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const result = await authOrchestrator.signup(credentials);
      
      if (result.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: result.user,
            offline: result.user?.offline || false
          }
        });
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: { error: result.error }
        });
      }
      
      return result;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: { error: error.message }
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    if (!authOrchestrator) return { success: false, error: 'Auth not initialized' };
    
    try {
      await authOrchestrator.logout();
      dispatch({ type: 'LOGOUT' });
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: { error: error.message }
      });
      return { success: false, error: error.message };
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return authOrchestrator?.isAuthenticated() || state.isAuthenticated;
  };

  // Get current user
  const getCurrentUser = () => {
    return authOrchestrator?.getCurrentUser() || state.user;
  };

  // Check if offline
  const isOffline = () => {
    return authOrchestrator?.isOffline() || state.offline;
  };

  // Authenticate resource access
  const authenticateResource = async (resourceUrl) => {
    if (!authOrchestrator) return { success: false, error: 'Auth not initialized' };
    
    return await authOrchestrator.authenticateResource(resourceUrl);
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    isAuthenticated,
    getCurrentUser,
    isOffline,
    authenticateResource,
    authOrchestrator // Provide access to the orchestrator instance if needed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protecting routes
export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated()) {
      return <div>Please log in to access this content.</div>;
    }
    
    return <Component {...props} />;
  };
};

// Protected route component
export const ProtectedRoute = ({ children, fallback = <div>Access denied</div> }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated() ? children : fallback;
};