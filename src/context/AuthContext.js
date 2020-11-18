import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext(null);
const initialAuthData = {};

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ initialAuthData });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("authcontext: ", AuthContext);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      const user = localStorage.getItem("user");
      const userInfo = JSON.parse(user);
      console.log("user info: ", userInfo);
      console.log("authcontext 2: ", AuthContext);
      setAuthData({ userInfo });
    }
    setLoading(false);
  }, []);

  const onLogin = (newAuthData) => {
    localStorage.setItem("accessToken", newAuthData.accessToken);
    localStorage.setItem("refreshToken", newAuthData.refreshToken);
    localStorage.setItem("user", JSON.stringify(newAuthData.user));
    setAuthData({ userInfo: newAuthData.user });
  };

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAuthData(initialAuthData);
  };

  const authDataValue = useMemo(() => ({ authData, onLogin, onLogout }), [
    authData,
  ]);

  return (
    <AuthContext.Provider value={authDataValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
