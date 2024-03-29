import * as React from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoutes/protected-route'
import { ROUTES } from './constant/routes'
import { LoginPage } from './pages/login'
import MenuPage from './pages/MenuPage'
import MonitorPage from './pages/MonitorPage'
import NotFoundPage from './pages/NotFoundPage'
import PedidosPage from './pages/PedidosPage'
import { useAuthStore } from './store/auth'
import HomePage from './pages/homePage'
import HistoryPage from './pages/historyPage'

export default function App() {

    const isAuth = useAuthStore(state => state.isAuth)

    return (
        <Routes>
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route index element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path={ROUTES.home} element={
                <ProtectedRoute isAllowed={isAuth}>
                    <HomePage />
                </ProtectedRoute>
            } />
            <Route path={ROUTES.pedidos} element={
                <ProtectedRoute isAllowed={isAuth}>
                    <PedidosPage />
                </ProtectedRoute>} />
            <Route path={ROUTES.monitor} element={
                <ProtectedRoute isAllowed={isAuth}>
                    <MonitorPage />
                </ProtectedRoute>} />
            <Route path={ROUTES.menu} element={
                <ProtectedRoute isAllowed={isAuth}>
                    <MenuPage />
                </ProtectedRoute>} />
            <Route path={ROUTES.history} element={
                <ProtectedRoute isAllowed={isAuth}>
                    <HistoryPage />
                </ProtectedRoute>} />

        </Routes>
    )
}

