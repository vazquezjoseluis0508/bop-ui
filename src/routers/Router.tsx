
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import PedidosPage from "../pages/PedidosPage/pedidosPage"
import {LoginPage} from "../pages/LoginPage/LoginPage"

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/pedidos" element={<PedidosPage/>} />
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
    </BrowserRouter>
  )
}
