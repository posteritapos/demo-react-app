import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/Home'

// Mock the SVG imports
jest.mock('../assets/react.svg', () => 'react-logo.svg')
jest.mock('/vite.svg', () => 'vite-logo.svg')

describe('Home Component', () => {
  test('renders home page with logos and heading', () => {
    render(<Home />)
    
    // Check if the main heading is present
    expect(screen.getByText('Vite + React + TypeScript')).toBeInTheDocument()
    
    // Check if logos are present
    const viteLogo = screen.getByAltText('Vite logo')
    const reactLogo = screen.getByAltText('React logo')
    
    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })

  test('counter functionality works correctly', () => {
    render(<Home />)
    
    // Find the counter button
    const counterButton = screen.getByRole('button', { name: /count is 0/i })
    expect(counterButton).toBeInTheDocument()
    
    // Click the button and check if count increases
    fireEvent.click(counterButton)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    
    // Click again to verify it continues to increment
    fireEvent.click(counterButton)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  test('renders external links with correct attributes', () => {
    render(<Home />)
    
    // Check Vite link
    const viteLink = screen.getByRole('link', { name: /vite logo/i })
    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(viteLink).toHaveAttribute('target', '_blank')
    expect(viteLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    // Check React link
    const reactLink = screen.getByRole('link', { name: /react logo/i })
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
    expect(reactLink).toHaveAttribute('target', '_blank')
    expect(reactLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('renders helpful text content', () => {
    render(<Home />)
    
    // Use getByText with a function to match text across multiple elements
    expect(screen.getByText((_, element) => {
      return element?.textContent === 'Edit src/App.tsx and save to test HMR'
    })).toBeInTheDocument()
    
    expect(screen.getByText(/Click on the Vite and React logos to learn more/)).toBeInTheDocument()
  })
})
