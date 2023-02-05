
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {LoginPage} from "../pages/login"

import { ProtectedRoute } from "../components/ProtectedRoutes/protected-route"
import { LayoutAdm } from "../components/Layout/layout"
import { ROUTES } from "../constant/routes"
import NotFoundPage from "../pages/NotFoundPage"
import HomePage from "../pages/HomePage"
import PedidosPage from "../pages/pedidosPage"
import { SessionProvider } from "../provider/SessionProvider"

export const Router = () => {



  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          {/*Protected Routes*/ }
          <Route element={<ProtectedRoute />}>
            <Route element={<LayoutAdm />}>
              <Route path={ROUTES.pedidos} element={<PedidosPage/>} />
            </Route>
          </Route>
            
          <Route path={ROUTES.login} element={<LoginPage/>} />
          <Route index element={<LoginPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  )
}
