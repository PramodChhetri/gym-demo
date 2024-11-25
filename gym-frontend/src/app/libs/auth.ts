export const Auth = {
    setToken: (token: string) => {
      localStorage.setItem('auth-token', token);
    },
  
    getToken: () => {
      return localStorage.getItem('auth-token');
    },
  
    setRole: (role: string) => {
      localStorage.setItem('auth-role', role);
    },
  
    getRole: () => {
      return localStorage.getItem('auth-role');
    },
  
    logout: () => {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-role');
    },
  
    isAuthenticated: () => {
      return !!localStorage.getItem('auth-token');
    },
  };
  