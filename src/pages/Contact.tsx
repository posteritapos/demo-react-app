import React, { useState } from 'react'

interface ContactForm {
  name: string
  email: string
  message: string
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setSubmitted(true)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', message: '' })
    }, 2000)
  }

  if (submitted) {
    return (
      <div>
        <h1>Thank You!</h1>
        <p>Your message has been submitted successfully. We'll get back to you soon!</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch with us using the form below:</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleInputChange}
            required
            rows={5}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: '#646cff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Other Ways to Reach Us:</h2>
        <p>📧 Email: contact@example.com</p>
        <p>📱 Phone: (555) 123-4567</p>
        <p>🏢 Address: 123 Tech Street, Dev City, DC 12345</p>
      </div>
    </div>
  )
}

export default Contact
