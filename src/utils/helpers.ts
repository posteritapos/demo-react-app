/**
 * Utility functions for the application
 */

export const formatContactInfo = (name: string, email: string, message: string) => {
  return {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateForm = (name: string, email: string, message: string) => {
  const errors: string[] = []
  
  if (!name.trim()) {
    errors.push('Name is required')
  }
  
  if (!email.trim()) {
    errors.push('Email is required')
  } else if (!validateEmail(email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!message.trim()) {
    errors.push('Message is required')
  } else if (message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}
