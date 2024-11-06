import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sold from "./pages/dashboard/sold";
import Stock from "./pages/dashboard/stock";
import Dashboard from "./pages/dashboard/user";
import SignUp from "./pages/sign-up";
import UpdateUser from "./pages/dashboard/update-user";
import SignIn from "./pages/sign-in";
import { useUserContext } from "./contexts/user-provider";
import AddCar from "./pages/dashboard/add-car";
import { useState, useEffect } from "react"; // Importação do useState e useEffect

export function Routers() {
  const { token } = useUserContext();  // Obtém o token do contexto
  const [loading, setLoading] = useState(true);  // Estado para controlar a tela de carregamento

  // Efeito para garantir que o token foi carregado
  useEffect(() => {
    const loadToken = async () => {
      // Simula o carregamento do token, caso necessário
      // Isso pode incluir lógica de recuperação do token de localStorage ou sessionStorage
      if (token) {
        setLoading(false);  // Token carregado, não precisa mais mostrar a tela de carregamento
      } else {
        setLoading(false);  // Mesmo sem o token, termina o carregamento
      }
    };
    
    loadToken();
  }, [token]);  // Dependência do token para atualizar o estado quando ele mudar

  if (loading) {
    return (
      <div className="loading-screen">Carregando...</div>  // Exibe uma tela de carregamento enquanto o token está sendo verificado
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/add-car" element={token ? <AddCar /> : <Navigate to="/" />} />
        <Route path="/stock" element={token ? <Stock /> : <Navigate to="/" />} />
        <Route path="/sold" element={token ? <Sold /> : <Navigate to="/" />} />
        <Route path="/update-user" element={token ? <UpdateUser /> : <Navigate to="/" />} />
        
        {/* Rota de login e cadastro com redirecionamento se o token já existir */}
        <Route path="/" element={!token ? <SignIn /> : <Navigate to="/dashboard" />} />
        <Route path="/sign-up" element={!token ? <SignUp /> : <Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
