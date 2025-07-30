import React, { useState } from 'react'

interface SignUpForm {
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    password: ''
  })
  
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Sign up form submitted:', form)
    setSubmitted(true)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setForm({ email: '', password: '' })
    }, 2000)
  }

  if (submitted) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>Your account has been created successfully. You can now sign in!</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Create your account using the form below:</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginTop: '20px' }}>
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
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
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
          Sign Up
        </button>
      </form>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Already have an account?</h2>
        <p>If you already have an account, you can sign in here.</p>
      </div>
    </div>
  )
}

export default SignUp