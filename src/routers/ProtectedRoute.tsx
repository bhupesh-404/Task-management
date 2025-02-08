import { useAuth } from "@hooks/useAuth"
import { Navigate, Outlet } from "react-router"

const ProtectedRoute = () => {
  const auth = useAuth()
  return auth ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
