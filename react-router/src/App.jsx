import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import AddBook from './pages/AddBook'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo"> BookStore</Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className="nav-link">Books</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-book" className="nav-link">Add Book</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2025 BookStore. All rights reserved.</p>
      </footer>
    </Router>
  )
}

export default App
