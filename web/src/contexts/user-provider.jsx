import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext({ token: null, handleLoggedIn: () => {} });

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);

  // Verifica se há um token salvo nos cookies ao inicializar o contexto
  useEffect(() => {
    const savedToken = Cookies.get("token")
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Função para gerenciar o estado de autenticação
  const handleLoggedIn = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 }); // Salva o token nos cookies com validade de 7 dias
    } else {
      setToken(null);
      Cookies.remove("token"); // Remove o token dos cookies se o usuário fizer logout
    }
  };

  const value = {
    token,
    handleLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
