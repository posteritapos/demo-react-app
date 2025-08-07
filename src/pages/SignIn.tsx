import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInForm {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const [form, setForm] = useState<SignInForm>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Sign in form submitted:', form)
    // Redirect to dashboard upon successful sign-in
    navigate('/dashboard');
    setForm({ email: '', password: '' }); // Reset form
  }

  return (
    <div>
      <h1>Sign In</h1>
      <p>Welcome back! Please sign in to your account:</p>
      
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
            minLength={6}
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
          Sign In
        </button>
      </form>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Don't have an account?</h2>
        <p>If you don't have an account, you can <a href="/signup" style={{ color: '#646cff', textDecoration: 'none' }}>sign up here</a>.</p>
      </div>
    </div>
  )
}

export default SignIn

