import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (!currentUser) return <Navigate to="/login" replace />

  return <Outlet />
}
