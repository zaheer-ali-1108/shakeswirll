import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("shakeToken");
    const savedUser = localStorage.getItem("shakeUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginAuth = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("shakeToken", tokenData);
    localStorage.setItem("shakeUser", JSON.stringify(userData));
  };

  const logoutAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("shakeToken");
    localStorage.removeItem("shakeUser");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAuth, logoutAuth, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
