import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";
import { DecodedToken, User } from "../components/types";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  user: DecodedToken | null;
  loading: boolean;
  updateUser: (newUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    const decoded = jwtDecode<DecodedToken>(token);
    setUser(decoded);
    console.log("Prisijungta", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    console.log("Atsijungta");
  };

  const updateUser = (newUser: User) => {
    setUser((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          ...newUser,
        };
      }

      return null;
    });
  };

  const ctxValue = {
    login,
    logout,
    loading,
    user,
    token,
    updateUser,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
