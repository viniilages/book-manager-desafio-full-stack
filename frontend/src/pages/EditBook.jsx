import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate,
  useParams
} from 'react-router-dom'

function EditBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] =
    useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    async function loadBook() {
      const token =
        localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await fetch(
          `http://localhost:8080/books/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
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

        if (response.status === 404) {
          setError('Livro não encontrado.')
          return
        }

        if (!response.ok) {
          setError(
            'Não foi possível carregar o livro.'
          )
          return
        }

        const book =
          await response.json()

        setTitle(book.title)
        setAuthor(book.author)
        setYear(book.year ?? '')
        setDescription(
          book.description ?? ''
        )

      } catch (error) {
        console.error(error)

        setError(
          'Não foi possível conectar ao servidor.'
        )

      } finally {
        setLoading(false)
      }
    }

    loadBook()

  }, [id, navigate])

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setSaving(true)

    const token =
      localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/books/${id}`,
        {
          method: 'PUT',

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

      if (response.status === 404) {
        setError('Livro não encontrado.')
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
          'Não foi possível atualizar o livro.'
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
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="loader" />

          <h3>Carregando livro...</h3>
        </div>
      </div>
    )
  }

  if (error && !title) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">
            !
          </div>

          <h2>{error}</h2>

          <button
            className="button button-primary"
            onClick={() =>
              navigate('/books')
            }
          >
            Voltar para livros
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container form-page">

      <section className="page-heading">
        <div>
          <span className="eyebrow">
            LIVRO #{id}
          </span>

          <h1>Editar livro</h1>

          <p>
            Atualize as informações deste livro.
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
              disabled={saving}
            >
              {saving
                ? 'Salvando...'
                : 'Salvar alterações'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditBook