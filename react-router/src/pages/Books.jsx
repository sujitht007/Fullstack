import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Books() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Fiction' },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, genre: 'Fiction' }
  ])

  return (
    <div className="books-container">
      <h1>📖 Books List</h1>
      <Link to="/add-book" className="btn-primary">+ Add New Book</Link>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Year:</strong> {book.year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <Link to={`/books/${book.id}`} className="btn-secondary">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
