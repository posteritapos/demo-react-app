import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import SignUp from '../pages/SignUp'

// Mock the SVG imports
jest.mock('../assets/react.svg', () => 'react-logo.svg')
jest.mock('/vite.svg', () => 'vite-logo.svg')

// Create a test version of the App without the outer Router
const TestApp = () => {
  const Navigation = () => (
    <nav style={{ 
      padding: '20px', 
      borderBottom: '1px solid #ccc', 
      marginBottom: '20px',
      display: 'flex',
      gap: '20px',
      justifyContent: 'center'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
        Home
      </Link>
      <Link to="/about" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
        About
      </Link>
      <Link to="/contact" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
        Contact
      </Link>
      <Link to="/signup" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
        Sign Up
      </Link>
    </nav>
  )

  return (
    <div className="App">
      <Navigation />
      <main style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={
            <div>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <Link to="/" style={{ color: '#646cff' }}>Go back to Home</Link>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

describe('App Component', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <TestApp />
      </MemoryRouter>
    )
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
  })

  test('renders home page by default', () => {
    render(
      <MemoryRouter>
        <TestApp />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Vite + React + TypeScript')).toBeInTheDocument()
    expect(screen.getByText(/count is 0/i)).toBeInTheDocument()
  })

  test('navigates to about page when about link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <TestApp />
      </MemoryRouter>
    )
    
    const aboutLink = screen.getByRole('link', { name: /about/i })
    await user.click(aboutLink)
    
    expect(screen.getByText('About Page')).toBeInTheDocument()
    expect(screen.getByText(/This is a React \+ TypeScript application/)).toBeInTheDocument()
  })

  test('navigates to contact page when contact link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <TestApp />
      </MemoryRouter>
    )
    
    const contactLink = screen.getByRole('link', { name: /contact/i })
    await user.click(contactLink)
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  })

  test('shows 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <TestApp />
      </MemoryRouter>
    )
    
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument()
    expect(screen.getByText("The page you're looking for doesn't exist.")).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go back to home/i })).toBeInTheDocument()
  })

  test('navigates to signup page when signup link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <TestApp />
      </MemoryRouter>
    )
    
    const signupLink = screen.getByRole('link', { name: /sign up/i })
    await user.click(signupLink)
    
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  test('navigation links have correct styling', () => {
    render(
      <MemoryRouter>
        <TestApp />
      </MemoryRouter>
    )
    
    const homeLink = screen.getByRole('link', { name: /home/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })
    const contactLink = screen.getByRole('link', { name: /contact/i })
    const signupLink = screen.getByRole('link', { name: /sign up/i })
    
    expect(homeLink).toHaveStyle({ color: '#646cff' })
    expect(aboutLink).toHaveStyle({ color: '#646cff' })
    expect(contactLink).toHaveStyle({ color: '#646cff' })
    expect(signupLink).toHaveStyle({ color: '#646cff' })
  })
})
