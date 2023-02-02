
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import PedidosPage from "../pages/PedidosPage/pedidosPage"
import {LoginPage} from "../pages/LoginPage/LoginPage"

import { ProtectedRoutes } from "../components/ProtectedRoutes/ProtectedRoutes"

export const Router = () => {

  const token  = true;

  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route element= {<ProtectedRoutes token={token}/>}>  
              <Route path="/home" element={<HomePage/>} />
              <Route path="*" element={<NotFoundPage/>} />
              <Route path="/pedidos" element={<PedidosPage/>} />
            </Route>
            
        </Routes>
    </BrowserRouter>
  )
}
