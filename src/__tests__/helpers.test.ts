import { formatContactInfo, validateEmail, validateForm, truncateText } from '../utils/helpers'

describe('Helper Functions', () => {
  describe('formatContactInfo', () => {
    test('formats contact information correctly', () => {
      const result = formatContactInfo('  John Doe  ', '  JOHN@EXAMPLE.COM  ', '  Hello World  ')
      
      expect(result.name).toBe('John Doe')
      expect(result.email).toBe('john@example.com')
      expect(result.message).toBe('Hello World')
      expect(result.timestamp).toBeDefined()
      expect(typeof result.timestamp).toBe('string')
    })

    test('handles empty strings', () => {
      const result = formatContactInfo('', '', '')
      
      expect(result.name).toBe('')
      expect(result.email).toBe('')
      expect(result.message).toBe('')
    })
  })

  describe('validateEmail', () => {
    test('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.org')).toBe(true)
    })

    test('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('missing@domain')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validateForm', () => {
    test('returns valid for correct form data', () => {
      const result = validateForm('John Doe', 'john@example.com', 'This is a valid message with enough characters')
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    test('returns errors for empty name', () => {
      const result = validateForm('', 'john@example.com', 'Valid message here')
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Name is required')
    })

    test('returns errors for empty email', () => {
      const result = validateForm('John Doe', '', 'Valid message here')
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Email is required')
    })

    test('returns errors for invalid email', () => {
      const result = validateForm('John Doe', 'invalid-email', 'Valid message here')
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter a valid email address')
    })

    test('returns errors for empty message', () => {
      const result = validateForm('John Doe', 'john@example.com', '')
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Message is required')
    })

    test('returns errors for short message', () => {
      const result = validateForm('John Doe', 'john@example.com', 'Short')
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Message must be at least 10 characters long')
    })

    test('returns multiple errors when multiple fields are invalid', () => {
      const result = validateForm('', 'invalid-email', 'Short')
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(3)
      expect(result.errors).toContain('Name is required')
      expect(result.errors).toContain('Please enter a valid email address')
      expect(result.errors).toContain('Message must be at least 10 characters long')
    })
  })

  describe('truncateText', () => {
    test('truncates text longer than maxLength', () => {
      const longText = 'This is a very long text that should be truncated'
      const result = truncateText(longText, 20)
      
      expect(result).toBe('This is a very long ...')
      expect(result.length).toBe(23) // 20 characters + '...'
    })

    test('returns original text if shorter than maxLength', () => {
      const shortText = 'Short text'
      const result = truncateText(shortText, 20)
      
      expect(result).toBe('Short text')
    })

    test('returns original text if equal to maxLength', () => {
      const exactText = 'Exactly twenty chars'
      const result = truncateText(exactText, 20)
      
      expect(result).toBe('Exactly twenty chars')
    })

    test('handles empty string', () => {
      const result = truncateText('', 10)
      
      expect(result).toBe('')
    })
  })
})
