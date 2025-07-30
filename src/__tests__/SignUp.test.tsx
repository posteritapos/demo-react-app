import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SignUp from '../pages/SignUp'

describe('SignUp Component', () => {
  test('renders sign up form with all fields', () => {
    render(<SignUp />)
    
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  test('allows user to fill out the form', async () => {
    const user = userEvent.setup()
    render(<SignUp />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  test('shows welcome message after form submission', async () => {
    const user = userEvent.setup()
    render(<SignUp />)
    
    // Fill out the form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /sign up/i }))
    
    // Check for welcome message
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
    expect(screen.getByText(/Your account has been created successfully/)).toBeInTheDocument()
  })

  test('form resets after timeout', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<SignUp />)
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign up/i }))
    
    // Fast-forward time and wrap in act
    await act(async () => {
      jest.advanceTimersByTime(2000)
    })
    
    // Check that form is back and empty
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('')
      expect(screen.getByLabelText(/password/i)).toHaveValue('')
    })
    
    jest.useRealTimers()
  }, 10000)

  test('renders additional information section', () => {
    render(<SignUp />)
    
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
    expect(screen.getByText(/If you already have an account, you can sign in here/)).toBeInTheDocument()
  })

  test('requires all fields to be filled', async () => {
    const user = userEvent.setup()
    render(<SignUp />)
    
    const submitButton = screen.getByRole('button', { name: /sign up/i })
    
    // Try to submit empty form
    await user.click(submitButton)
    
    // Form should not submit (welcome message should not appear)
    expect(screen.queryByText('Welcome!')).not.toBeInTheDocument()
  }, 10000)

  test('email field has correct type', () => {
    render(<SignUp />)
    
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  test('password field has correct type', () => {
    render(<SignUp />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})