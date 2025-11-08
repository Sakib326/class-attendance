import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role?: {
    type: string;
    name: string;
    id: string;
  };
  permissions?: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (authData: AuthData) => void;
  logout: () => void;
  isLoading: boolean;
}

interface AuthData {
  token: string;
  refreshToken: string;
  user: User;
  expirationTime: number;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authData = localStorage.getItem("auth");

      if (!authData) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      const auth: AuthData = JSON.parse(authData);
      console.log("Checking auth:", auth);

      if (
        auth &&
        auth.token &&
        auth.expirationTime &&
        auth.expirationTime > new Date().getTime()
      ) {
        setIsAuthenticated(true);
        setUser(auth.user);
      } else {
        console.warn("Token expired or invalid:", auth.expirationTime);
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      localStorage.removeItem("auth");
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  const login = (authData: AuthData) => {
    if (
      !authData.token ||
      !authData.user ||
      !authData.expirationTime ||
      authData.expirationTime <= new Date().getTime()
    ) {
      console.error("Invalid auth data provided during login");
      return;
    }

    localStorage.setItem("auth", JSON.stringify(authData));
    setIsAuthenticated(true);
    setUser(authData.user);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
