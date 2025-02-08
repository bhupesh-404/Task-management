import { useAuth } from "@hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router"

const ProtectedRoute = () => {
  const auth = useAuth()
  const location = useLocation()
  const isLogin = location.pathname == "/login"

  if (!auth) return <Navigate to="/login" state={{ from: location }} replace />
  return !isLogin ? <Outlet /> : <Navigate to="/tasks" replace />
}

export default ProtectedRoute
