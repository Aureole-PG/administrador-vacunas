import { createContext, useCallback, useState } from "react";
import { findUser } from "../store/auth";
import { useHistory } from "react-router";
export const AuthContext = createContext();

const initialState = {
  nombre: null,
  email: null,
  logged: false,
  rol: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const history = useHistory();
  const login = async (usuario, password) => {
    const user = await findUser(usuario, password);
    console.log(user);
    if (!user) return false;
    localStorage.setItem(
      "logged",
      JSON.stringify({
        nombre: user.nombre,
        email: user.email,
        cedula: user.cedula,
        logged: true,
        rol: user.rol,
      })
    );
    setAuth({
      nombre: user.nombre,
      email: user.email,
      cedula: user.cedula,
      logged: true,
      rol: user.rol,
    });
  };
  const verificaToken = useCallback(async () => {
    const user = localStorage.getItem("logged");
    if (!user) {
      console.log("no existe");
      setAuth({
        nombre: null,
        email: null,
        logged: false,
        cedula: null,
        rol: null,
      });

      return false;
    }
    const userObj = JSON.parse(user);
    console.log(userObj);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
