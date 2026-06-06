import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= LOAD USER ON REFRESH ================= */

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token =
          localStorage.getItem("token");

        // NO TOKEN
        if (!token) {

          setLoading(false);
          return;
        }

        // FETCH USER FROM BACKEND

        const res = await axios.get(

          "http://localhost:5000/api/user/me",

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(res.data.user);

      } catch (error) {

        console.log(error);

        // TOKEN INVALID

        localStorage.removeItem("token");

        setUser(null);

      } finally {

        setLoading(false);
      }
    };

    fetchUser();

  }, []);

  /* ================= LOGIN ================= */

  const login = (token, userData) => {

    localStorage.setItem("token", token);

    setUser(userData);
  };

  /* ================= LOGOUT ================= */

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

    window.location.href = "/login";
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */

export const useAuth = () =>
  useContext(AuthContext);