import { useParams, Link } from 'react-router-dom'

export default function BookDetail() {
  const { id } = useParams()

  const books = {
    1: { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Fiction', pages: 180, description: 'A tragic love story set in the Jazz Age.' },
    2: { id: 2, title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian', pages: 328, description: 'A dark novel about totalitarianism and surveillance.' },
    3: { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction', pages: 324, description: 'A gripping tale of racial injustice and childhood innocence.' },
    4: { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance', pages: 432, description: 'A romance novel about social class and marriage.' },
    5: { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, genre: 'Fiction', pages: 277, description: 'The story of a teenage boy\'s mental breakdown.' }
  }

  const book = books[id]

  if (!book) {
    return (
      <div className="error">
        <h1>Book Not Found</h1>
        <Link to="/books" className="btn-primary">Back to Books</Link>
      </div>
    )
  }

  return (
    <div className="book-detail">
      <Link to="/books" className="btn-secondary">← Back to Books</Link>
      <div className="detail-card">
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Year Published:</strong> {book.year}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>
    </div>
  )
}
