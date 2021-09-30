import { createContext, useCallback, useState } from "react";
import { findUserLogin } from "../store/auth";
import { findUser } from "../store/users";
export const AuthContext = createContext();

const initialState = {
  nombre: null,
  email: null,
  cedula: null,
  logged: false,
  rol: null,
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const login = async (usuario, password) => {
    const user = await findUserLogin(usuario, password);
    if (!user) return false;
    localStorage.setItem(
      "logged",
      JSON.stringify({
        nombre: user.nombre,
        email: user.email,
        cedula: user.cedula,
        logged: true,
        rol: user.rol,
        user: user,
      })
    );
    setAuth({
      nombre: user.nombre,
      email: user.email,
      cedula: user.cedula,
      logged: true,
      rol: user.rol,
      user: user,
    });
  };
  const UpdateData = async () => {
    const user = await findUser(auth.cedula);
    setAuth({
      ...auth,
      user: user,
    });
  };
  const verificaToken = useCallback(async () => {
    const user = localStorage.getItem("logged");
    if (!user) {
      setAuth({
        nombre: null,
        email: null,
        logged: false,
        cedula: null,
        rol: null,
        user: null,
      });

      return false;
    }
    const userObj = JSON.parse(user);
    setAuth(userObj);
  }, []);
  const logout = () => {
    localStorage.removeItem("logged");

    setAuth({
      logged: false,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        verificaToken,
        logout,
        UpdateData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
