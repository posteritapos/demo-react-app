import React from 'react'

interface NavigationProps {
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  return (
    <nav className={className} style={{ 
      padding: '20px', 
      borderBottom: '1px solid #ccc', 
      marginBottom: '20px',
      display: 'flex',
      gap: '20px'
    }}>
      <a href="/" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
        Home
      </a>
      <a href="/about" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
        About
      </a>
      <a href="/contact" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
        Contact
      </a>
    </nav>
  )
}

export default Navigation
