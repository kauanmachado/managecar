import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Sold from "./pages/dashboard/sold"
import Stock from "./pages/dashboard/stock"
import Dashboard from "./pages/dashboard/user"
import SignUp from "./pages/sign-up"
import UpdateUser from "./pages/dashboard/update-user"
import SignIn from "./pages/sign-in"
import { useUserContext } from "./contexts/user-provider"
import AddCar from "./pages/dashboard/add-car"


export function Routers() {
  const { token } = useUserContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={ token ? <Dashboard /> : <Navigate to="/"/>} />
        <Route path='/add-car' element={ token ? <AddCar /> : <Navigate to="/"/>} />
        <Route path='/stock' element={ token ? <Stock /> : <Navigate to="/"/>} />
        <Route path='/sold' element={ token ? <Sold /> : <Navigate to="/"/>} />
        <Route path='/update-user' element={ token ? <UpdateUser /> : <Navigate to="/"/>} />

        <Route path='/' element={!token ? <SignIn /> : <Navigate to="/dashboard" />} />
        <Route path='/sign-up' element={!token ? <SignUp /> : <Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers