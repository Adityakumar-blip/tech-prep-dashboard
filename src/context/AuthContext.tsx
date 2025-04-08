import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("dlabss-admin");

      if (storedAuth) {
        try {
          const { user } = JSON.parse(storedAuth);

          console.log("user", user);
          // Check if token is expired
          setUser(user);
        } catch (error) {
          console.error("Failed to parse auth data", error);
          localStorage.removeItem("dlabss-admin");
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Mock login logic - replace with actual API call in production
    if (email === "admin@snip.ai" && password === "admin123") {
      const userData = {
        email,
        name: "Admin User",
        role: "admin",
      };

      // Save auth data to localStorage
      localStorage.setItem(
        "snip-admin-auth",
        JSON.stringify({
          user: userData,
          token: "mock-jwt-token",
          expires: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours
        })
      );

      setUser(userData);
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem("dlabss-admin");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
