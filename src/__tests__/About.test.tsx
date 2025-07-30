import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import About from '../pages/About'

describe('About Component', () => {
  test('renders about page with correct heading', () => {
    render(<About />)
    
    expect(screen.getByText('About Page')).toBeInTheDocument()
  })

  test('renders description text', () => {
    render(<About />)
    
    expect(screen.getByText(/This is a React \+ TypeScript application with routing!/)).toBeInTheDocument()
    expect(screen.getByText(/Built with Vite for fast development and hot module replacement\./)).toBeInTheDocument()
  })

  test('renders features section', () => {
    render(<About />)
    
    expect(screen.getByText('Features:')).toBeInTheDocument()
    
    // Check for feature list items
    expect(screen.getByText(/⚡ Vite for lightning-fast development/)).toBeInTheDocument()
    expect(screen.getByText(/⚛️ React 19 with latest features/)).toBeInTheDocument()
    expect(screen.getByText(/🔷 TypeScript for type safety/)).toBeInTheDocument()
    expect(screen.getByText(/🛣️ React Router for navigation/)).toBeInTheDocument()
    expect(screen.getByText(/🎨 Modern ES modules/)).toBeInTheDocument()
    expect(screen.getByText(/🔧 ESLint with TypeScript support/)).toBeInTheDocument()
  })

  test('renders tech stack section', () => {
    render(<About />)
    
    expect(screen.getByText('Tech Stack:')).toBeInTheDocument()
    expect(screen.getByText(/This application demonstrates modern React development practices/)).toBeInTheDocument()
  })
})
