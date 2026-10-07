import {
  useCallback,
  useEffect,
  useState
} from 'react'

import { useNavigate } from 'react-router-dom'

function Books() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loadBooks = useCallback(
    async (title = '') => {
      const token =
        localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      setLoading(true)
      setError('')

      try {
        let url =
          'http://localhost:8080/books'

        if (title.trim() !== '') {
          url += `?title=${encodeURIComponent(
            title.trim()
          )}`
        }

        const response = await fetch(
          url,
          {
            headers: {
              Authorization: `Bearer ${token}`
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

        if (!response.ok) {
          setError(
            'Não foi possível carregar os livros.'
          )
          return
        }

        const data =
          await response.json()

        setBooks(data)

      } catch (error) {
        console.error(error)

        setError(
          'Não foi possível conectar ao servidor.'
        )

      } finally {
        setLoading(false)
      }
    },
    [navigate]
  )

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  function handleSearch(event) {
    event.preventDefault()

    loadBooks(search)
  }

  function handleClearSearch() {
    setSearch('')
    loadBooks()
  }

  async function handleDelete(id) {
    const confirmed =
      window.confirm(
        'Tem certeza que deseja excluir este livro?'
      )

    if (!confirmed) {
      return
    }

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
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`
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
          'Não foi possível excluir o livro.'
        )
        return
      }

      setBooks((currentBooks) =>
        currentBooks.filter(
          (book) => book.id !== id
        )
      )

    } catch (error) {
      console.error(error)

      setError(
        'Não foi possível conectar ao servidor.'
      )
    }
  }

  return (
    <div className="page-container">

      <section className="page-heading">
        <div>
          <span className="eyebrow">
            BIBLIOTECA
          </span>

          <h1>Meus livros</h1>

          <p>
            Gerencie todos os livros cadastrados.
          </p>
        </div>

        <button
          className="button button-primary"
          onClick={() =>
            navigate('/books/new')
          }
        >
          + Novo livro
        </button>
      </section>

      <section className="toolbar">
        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <div className="search-input-wrapper">
            <span className="search-icon">
              ⌕
            </span>

            <input
              className="search-input"
              type="text"
              placeholder="Buscar livro por título..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <button
            className="button button-secondary"
            type="submit"
          >
            Buscar
          </button>

          {search && (
            <button
              className="button button-ghost"
              type="button"
              onClick={handleClearSearch}
            >
              Limpar
            </button>
          )}
        </form>
      </section>

      {error && (
        <div className="message message-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="empty-state">
          <div className="loader" />

          <h3>Carregando livros...</h3>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            📚
          </div>

          <h2>Nenhum livro encontrado</h2>

          <p>
            Cadastre seu primeiro livro para começar.
          </p>

          <button
            className="button button-primary"
            onClick={() =>
              navigate('/books/new')
            }
          >
            Cadastrar livro
          </button>
        </div>
      ) : (
        <>
          <div className="results-info">
            {books.length}{' '}
            {books.length === 1
              ? 'livro encontrado'
              : 'livros encontrados'}
          </div>

          <section className="books-grid">
            {books.map((book) => (
              <article
                className="book-card"
                key={book.id}
              >
                <div className="book-card-top">
                  <span className="book-id">
                    #{book.id}
                  </span>
                </div>

                <div className="book-cover">
                 
                </div>

                <div className="book-content">
                    <h2>{book.title}</h2>

                    <p className="book-author">
                        <strong>Autor:</strong> {book.author}
                    </p>

                    {book.year && (
                        <p className="book-year-text">
                        <strong>Ano:</strong> {book.year}
                        </p>
                    )}

                    <p className="book-description">
                        <strong>Descrição:</strong>{' '}
                        {book.description || 'Sem descrição cadastrada.'}
                    </p>
                </div>

                <div className="book-actions">
                  <button
                    className="button button-secondary"
                    onClick={() =>
                      navigate(
                        `/books/${book.id}/edit`
                      )
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="button button-danger"
                    onClick={() =>
                      handleDelete(book.id)
                    }
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  )
}

export default Books