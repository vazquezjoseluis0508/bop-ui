import { Navigate , Outlet } from 'react-router-dom'

export const ProtectedRoutes = ({token , redirectTo="/login"})=> {
    if(token==false){
        return <Navigate to={redirectTo}/>
    }
    return <Outlet/>
}

