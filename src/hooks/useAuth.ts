export const useAuth = () => {
  const user = localStorage.getItem("user") // Simulated auth state
  return user ? JSON.parse(user) : null
}
