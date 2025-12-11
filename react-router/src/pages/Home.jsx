import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <h1>📚 Book Store</h1>
      <p>Welcome to our online book store! Explore thousands of books.</p>
      <div className="home-links">
        <Link to="/books" className="btn-primary">Browse Books</Link>
        <Link to="/add-book" className="btn-secondary">Add a Book</Link>
      </div>
    </div>
  )
}
