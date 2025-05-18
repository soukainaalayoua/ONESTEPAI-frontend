import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  verify: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // Helpers for localStorage
  const saveToStorage = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
  };
  const clearStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // State
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("user");
    return s && s !== "undefined" ? JSON.parse(s) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  // attach token header
  useEffect(() => {
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  }, [token]);
  // logout
  const logout = useCallback(() => {
    clearStorage();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);
  // load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return setIsLoading(false);
      try {
        const res = await axios.get(
          "https://onestepai-backend.salayoua.repl.co/api/auth/user"
        );
        setUser({ ...res.data, token });
        setIsAuthenticated(true);
        saveToStorage(res.data, token);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  // login
  const login = useCallback(async (email, password) => {
    const res = await axios.post(
      "https://onestepai-backend.salayoua.repl.co/api/auth/login",
      {
        email,
        password,
      }
    );
    const { token: t, ...u } = res.data;
    setUser({ ...u, token: t });
    setToken(t);
    setIsAuthenticated(true);
    saveToStorage(u, t);
  }, []);

  // register (send code only)
  const register = useCallback(async (name, email, password) => {
    const res = await axios.post(
      "https://onestepai-backend.salayoua.repl.co/api/auth/register",
      {
        name,
        email,
        password,
      }
    );
    return res.data.message;
  }, []);

  // verify (exchange code → token + user)
  const verify = useCallback(async (email, code) => {
    const res = await axios.post(
      "https://onestepai-backend.salayoua.repl.co/api/auth/verify-email",
      {
        email,
        code,
      }
    );
    // assume backend now returns { _id, name, email, isPro, token }
    const { token: t, _id, name, email: e, isPro } = res.data;
    const u = { _id, name, email: e, isPro };
    setUser({ ...u, token: t });
    setToken(t);
    setIsAuthenticated(true);
    saveToStorage(u, t);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        verify,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
