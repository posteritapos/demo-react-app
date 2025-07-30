import React, { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello React JS</h1>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={() => setCount((count) => count - 1)}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            -
          </button>
          <span style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            minWidth: '120px', 
            textAlign: 'center' 
          }}>
            count is {count}
          </span>
          <button 
            onClick={() => setCount((count) => count + 1)}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            +
          </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Home
