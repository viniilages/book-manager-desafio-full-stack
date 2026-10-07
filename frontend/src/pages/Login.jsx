import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8080/auth/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      )

      if (!response.ok) {
        setError('Usuário ou senha inválidos.')
        return
      }

      const data = await response.json()

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', username)

      navigate('/books')

    } catch (error) {
      console.error(error)

      setError(
        'Não foi possível conectar ao servidor.'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background auth-background-one" />
      <div className="auth-background auth-background-two" />

      <div className="auth-card">
        <div className="auth-logo">
          B
        </div>

        <div className="auth-heading">
          <span className="eyebrow">
            BOOK MANAGER
          </span>

          <h1>Bem-vindo</h1>

          <p>
            Entre na sua conta para gerenciar sua biblioteca.
          </p>
        </div>

        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="username">
              Usuário
            </label>

            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Senha
            </label>

            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="message message-error">
              {error}
            </div>
          )}

          <button
            className="button button-primary button-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Entrando...'
              : 'Entrar'}
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <button
          className="button button-secondary button-full"
          type="button"
          onClick={() => navigate('/register')}
        >
          Criar nova conta
        </button>

        <p className="auth-footer">
          Organize seus livros de forma simples.
        </p>
      </div>
    </div>
  )
}

export default Login