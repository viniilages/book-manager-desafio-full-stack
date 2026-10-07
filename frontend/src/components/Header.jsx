import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  const username = localStorage.getItem('username') || 'Usuário'

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')

    navigate('/login')
  }

  return (
    <header className="header">

      <div
        className="header-brand"
        onClick={() => navigate('/books')}
      >
        <div className="brand-icon">
          B
        </div>

        <div>
          <strong>Book Manager</strong>
          <span>Sua biblioteca</span>
        </div>
      </div>

      <div className="header-user">

        <div className="username-badge">
          <strong>{username}</strong>
        </div>

        <button
          className="button button-secondary button-small"
          onClick={handleLogout}
        >
          Sair
        </button>

      </div>

    </header>
  )
}

export default Header