import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = ({ user, children, redirectTo='/'}) => {
    if (!user) {
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}
