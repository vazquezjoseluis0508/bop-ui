
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import PedidosPage from "../pages/PedidosPage/PedidosPage"
export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/pedidos" element={<PedidosPage/>} />
        </Routes>
    </BrowserRouter>
  )
}
