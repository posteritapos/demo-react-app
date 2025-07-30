/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page successfully', () => {
    cy.contains('Vite + React + TypeScript').should('be.visible')
    cy.get('h1').should('contain', 'Vite + React + TypeScript')
  })

  it('should display the correct logos', () => {
    cy.get('img[alt="Vite logo"]').should('be.visible')
    cy.get('img[alt="React logo"]').should('be.visible')
    
    // Check if logos are clickable links
    cy.get('a[href="https://vite.dev"]').should('exist')
    cy.get('a[href="https://react.dev"]').should('exist')
  })

  it('should have a working counter', () => {
    // Initial state
    cy.get('button').should('contain', 'count is 0')
    
    // Click the button multiple times
    cy.get('button').click()
    cy.get('button').should('contain', 'count is 1')
    
    cy.get('button').click()
    cy.get('button').should('contain', 'count is 2')
    
    cy.get('button').click()
    cy.get('button').should('contain', 'count is 3')
  })

  it('should display helpful development text', () => {
    cy.contains('Edit src/App.tsx and save to test HMR').should('be.visible')
    cy.contains('Click on the Vite and React logos to learn more').should('be.visible')
  })

  it('should have proper navigation links', () => {
    cy.get('nav').should('be.visible')
    cy.get('nav a[href="/"]').should('contain', 'Home')
    cy.get('nav a[href="/about"]').should('contain', 'About')
    cy.get('nav a[href="/contact"]').should('contain', 'Contact')
  })

  it('should have proper styling and layout', () => {
    // Check if main elements are present
    cy.get('.App').should('exist')
    cy.get('nav').should('have.css', 'padding', '20px')
    cy.get('button').should('be.visible')
    
    // Check responsive behavior
    cy.viewport(768, 1024) // tablet
    cy.get('h1').should('be.visible')
    
    cy.viewport(375, 667) // mobile
    cy.get('h1').should('be.visible')
  })

  it('should handle external links correctly', () => {
    // Test external links (check they have correct attributes but don't follow them)
    cy.get('a[href="https://vite.dev"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
    
    cy.get('a[href="https://react.dev"]')
      .should('have.attr', 'target', '_blank')  
      .should('have.attr', 'rel', 'noopener noreferrer')
  })
})
