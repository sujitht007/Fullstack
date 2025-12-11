import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddBook() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: new Date().getFullYear(),
    genre: 'Fiction',
    pages: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'year' || name === 'pages' ? parseInt(value) : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Please fill in all required fields')
      return
    }
    alert(`Book "${formData.title}" added successfully!`)
    setFormData({ title: '', author: '', year: new Date().getFullYear(), genre: 'Fiction', pages: '' })
    navigate('/books')
  }

  return (
    <div className="add-book-container">
      <h1>📝 Add a New Book</h1>
      <Link to="/books" className="btn-secondary">← Back to Books</Link>
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>Book Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label>Author *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label>Year Published</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1000"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Romance</option>
            <option>Mystery</option>
            <option>Science Fiction</option>
            <option>Dystopian</option>
            <option>Biography</option>
            <option>Self-Help</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number of Pages</label>
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Enter number of pages"
            min="1"
          />
        </div>

        <button type="submit" className="btn-primary">Add Book</button>
      </form>
    </div>
  )
}
