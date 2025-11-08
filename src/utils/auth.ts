export const getAuthData = () => {
  const authData = localStorage.getItem("auth");
  if (!authData) return null;

  try {
    return JSON.parse(authData);
  } catch (error) {
    console.error("Error parsing auth data:", error);
    localStorage.removeItem("auth");
    return null;
  }
};

// Get user information
export const getUser = () => {
  const authData = getAuthData();
  return authData?.user || null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const authData = getAuthData();
  return !!authData?.token;
};

// Get user role
export const getUserRole = () => {
  const user = getUser();
  return user?.role?.type || null;
};

// Check if user has specific role(s)
export const hasRole = (roles: string | string[]) => {
  const userRole = getUserRole();
  if (!userRole) return false;

  if (Array.isArray(roles)) {
    return roles.includes(userRole);
  }

  return userRole === roles;
};

// Check if user is admin
export const isAdmin = () => {
  return hasRole("ADMIN");
};

// Check if user is regular user
export const isUser = () => {
  return hasRole("USER");
};

// Logout user
export const logout = () => {
  localStorage.removeItem("auth");
  window.location.href = "/login";
};

// Get authentication token
export const getToken = () => {
  const authData = getAuthData();
  return authData?.token || null;
};

// Auth data interface
export interface AuthData {
  token: string;
  user?: {
    role?: {
      type: string;
    };
  };
  expiresAt?: string;
}

// Set authentication data
export const setAuthData = (data: AuthData) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

// Check if token is expired
export const isTokenExpired = () => {
  const authData = getAuthData();
  if (!authData?.expiresAt) return true;

  return new Date(authData.expiresAt) < new Date();
};
