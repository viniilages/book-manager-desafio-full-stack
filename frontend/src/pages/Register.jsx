import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8080/auth/register',
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

      if (response.status === 409) {
        setError(
          'Esse nome de usuário já está cadastrado.'
        )
        return
      }

      if (response.status === 400) {
        setError(
          'Informe um usuário e uma senha válidos.'
        )
        return
      }

      if (!response.ok) {
        setError('Não foi possível criar a conta.')
        return
      }

      setSuccess(
        'Conta criada com sucesso! Redirecionando...'
      )

      setTimeout(() => {
        navigate('/login')
      }, 1200)

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
            NOVA CONTA
          </span>

          <h1>Crie sua conta</h1>

          <p>
            Comece agora a organizar sua biblioteca.
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
              placeholder="Escolha um nome de usuário"
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
              placeholder="Crie uma senha"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="message message-error">
              {error}
            </div>
          )}

          {success && (
            <div className="message message-success">
              {success}
            </div>
          )}

          <button
            className="button button-primary button-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Criando conta...'
              : 'Criar conta'}
          </button>
        </form>

        <button
          className="button button-ghost button-full"
          type="button"
          onClick={() => navigate('/login')}
        >
          ← Voltar para o login
        </button>
      </div>
    </div>
  )
}

export default Register