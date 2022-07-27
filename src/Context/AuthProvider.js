import { createContext, useContext, useEffect, useState } from "react";

export const AutContext = createContext();
export const AuthContextDispatcher = createContext();

const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authState"));
    setAuth(userData);
  }, []);
  return (
    <div>
      <AutContext.Provider value={Auth}>
        <AuthContextDispatcher.Provider value={setAuth}>
          {children}
        </AuthContextDispatcher.Provider>
      </AutContext.Provider>
    </div>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AutContext);
export const useAuthActions = () => useContext(AuthContextDispatcher);
