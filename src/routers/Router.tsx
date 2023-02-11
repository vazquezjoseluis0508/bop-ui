
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {LoginPage} from "../pages/login"

import { ProtectedRoute } from "../components/ProtectedRoutes/protected-route"
import Layout from "../components/Layout/layout"
import { ROUTES } from "../constant/routes"
import NotFoundPage from "../pages/NotFoundPage"
import { SessionProvider } from "../provider/SessionProvider"
import PedidosPage from "../pages/pedidos"


export const Router = () => {



  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          {/*Protected Routes*/ }
          <Route element={<ProtectedRoute />}>
            <Layout>
              <Route path={ROUTES.pedidos} element={<PedidosPage/>} />
            </Layout>
          </Route>
            
          <Route path={ROUTES.login} element={<LoginPage/>} />
          <Route index element={<LoginPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  )
}
