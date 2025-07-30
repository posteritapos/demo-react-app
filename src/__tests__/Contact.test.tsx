import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Contact from '../pages/Contact'

describe('Contact Component', () => {
  test('renders contact form with all fields', () => {
    render(<Contact />)
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  test('allows user to fill out the form', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message')
    
    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('This is a test message')
  })

  test('shows thank you message after form submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }))
    
    // Check for thank you message
    expect(screen.getByText('Thank You!')).toBeInTheDocument()
    expect(screen.getByText(/Your message has been submitted successfully/)).toBeInTheDocument()
  })

  test('form resets after timeout', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<Contact />)
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    
    // Fast-forward time and wrap in act
    await act(async () => {
      jest.advanceTimersByTime(2000)
    })
    
    // Check that form is back and empty
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email/i)).toHaveValue('')
      expect(screen.getByLabelText(/message/i)).toHaveValue('')
    })
    
    jest.useRealTimers()
  }, 10000)

  test('renders contact information', () => {
    render(<Contact />)
    
    expect(screen.getByText('Other Ways to Reach Us:')).toBeInTheDocument()
    expect(screen.getByText(/📧 Email: contact@example\.com/)).toBeInTheDocument()
    expect(screen.getByText(/📱 Phone: \(555\) 123-4567/)).toBeInTheDocument()
    expect(screen.getByText(/🏢 Address: 123 Tech Street, Dev City, DC 12345/)).toBeInTheDocument()
  })

  test('requires all fields to be filled', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Try to submit empty form
    await user.click(submitButton)
    
    // Form should not submit (thank you message should not appear)
    expect(screen.queryByText('Thank You!')).not.toBeInTheDocument()
  }, 10000)
})
