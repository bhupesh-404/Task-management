import { useAuth } from "@hooks/useAuth"
import { Navigate, Outlet } from "react-router"

const RootRedirect = () => {
  const auth = useAuth()
  const isLogin = location.pathname == "/login"

  return auth ? (
    <Navigate to="/tasks" replace />
  ) : isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default RootRedirect
