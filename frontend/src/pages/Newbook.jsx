import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] =
    useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] =
    useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    const token =
      localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:8080/books/create',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({
            title,
            author,
            year: year
              ? Number(year)
              : null,
            description
          })
        }
      )

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')

        navigate('/login')
        return
      }

      if (response.status === 400) {
        setError(
          'Preencha título e autor corretamente.'
        )
        return
      }

      if (!response.ok) {
        setError(
          'Não foi possível cadastrar o livro.'
        )
        return
      }

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
    <div className="page-container form-page">

      <section className="page-heading">
        <div>
          <span className="eyebrow">
            NOVO LIVRO
          </span>

          <h1>Cadastrar livro</h1>

          <p>
            Adicione um novo título à sua biblioteca.
          </p>
        </div>
      </section>

      <div className="form-card">
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">

            <div className="form-group form-group-full">
              <label htmlFor="title">
                Título
              </label>

              <input
                id="title"
                type="text"
                placeholder="Ex: O Senhor dos Anéis"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">
                Autor
              </label>

              <input
                id="author"
                type="text"
                placeholder="Ex: J. R. R. Tolkien"
                value={author}
                onChange={(event) =>
                  setAuthor(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">
                Ano
              </label>

              <input
                id="year"
                type="number"
                placeholder="Ex: 1954"
                value={year}
                onChange={(event) =>
                  setYear(event.target.value)
                }
              />
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="description">
                Descrição
              </label>

              <textarea
                id="description"
                rows="6"
                placeholder="Escreva uma breve descrição..."
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
              />
            </div>

          </div>

          {error && (
            <div className="message message-error">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              className="button button-ghost"
              type="button"
              onClick={() =>
                navigate('/books')
              }
            >
              Cancelar
            </button>

            <button
              className="button button-primary"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Cadastrando...'
                : 'Cadastrar livro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewBook