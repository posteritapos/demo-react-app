import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SignIn from '../pages/SignIn'

describe('SignIn Component', () => {
  test('renders sign in form with all fields', () => {
    render(<SignIn />)
    
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  test('allows user to fill out the form', async () => {
    const user = userEvent.setup()
    render(<SignIn />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  test('shows success message after valid form submission', async () => {
    const user = userEvent.setup()
    render(<SignIn />)
    
    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    // Check for success message
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument()
    expect(screen.getByText(/You have successfully signed in/)).toBeInTheDocument()
  })

  test('form resets after success timeout', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<SignIn />)
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    // Fast-forward through success display
    await act(async () => {
      jest.advanceTimersByTime(2000)
    })
    
    // Check that form is back and empty
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })
    
    // Check the values are empty
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByLabelText(/password/i)).toHaveValue('')
    
    jest.useRealTimers()
  }, 10000)

  test('renders sign up link', () => {
    render(<SignIn />)
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    expect(screen.getByText(/If you don't have an account, you can/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up here/i })).toBeInTheDocument()
  })

  test('email field has correct type', () => {
    render(<SignIn />)
    
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  test('password field has correct type', () => {
    render(<SignIn />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('password field has minimum length requirement', () => {
    render(<SignIn />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('minLength', '6')
  })

  test('requires all fields to be filled', async () => {
    const user = userEvent.setup()
    render(<SignIn />)
    
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    // Try to submit empty form
    await user.click(submitButton)
    
    // Form should not submit (welcome message should not appear)
    expect(screen.queryByText('Welcome Back!')).not.toBeInTheDocument()
  })

  test('renders welcome message', () => {
    render(<SignIn />)
    
    expect(screen.getByText('Welcome back! Please sign in to your account:')).toBeInTheDocument()
  })

  test('has consistent styling with other forms', () => {
    render(<SignIn />)
    
    const form = document.querySelector('form')
    expect(form).toHaveStyle('max-width: 500px')
    
    const button = screen.getByRole('button', { name: /sign in/i })
    expect(button).toHaveStyle('background-color: rgb(100, 108, 255)')
  })
})
