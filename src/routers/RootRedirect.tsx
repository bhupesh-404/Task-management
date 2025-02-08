import { useAuth } from "@hooks/useAuth"
import { Navigate } from "react-router"

const RootRedirect = () => {
  const auth = useAuth()
  return auth ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default RootRedirect
