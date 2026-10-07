import { Navigate } from 'react-router-dom'
import Header from './Header'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default ProtectedRoute