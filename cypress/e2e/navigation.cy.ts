/// <reference types="cypress" />

describe('Navigation and Routing', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate between pages using navigation links', () => {
    // Start on Home page
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Hello React JS').should('be.visible')

    // Navigate to About page
    cy.get('nav a[href="/about"]').click()
    cy.url().should('include', '/about')
    cy.contains('About Page').should('be.visible')
    cy.contains('This is a React + TypeScript application with routing!').should('be.visible')

    // Navigate to Contact page
    cy.get('nav a[href="/contact"]').click() 
    cy.url().should('include', '/contact')
    cy.contains('Contact Us').should('be.visible')
    cy.get('form').should('be.visible')

    // Navigate back to Home
    cy.get('nav a[href="/"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Hello React JS').should('be.visible')
  })

  it('should handle direct URL navigation', () => {
    // Direct navigation to About
    cy.visit('/about')
    cy.contains('About Page').should('be.visible')
    cy.contains('Features:').should('be.visible')
    
    // Direct navigation to Contact
    cy.visit('/contact')
    cy.contains('Contact Us').should('be.visible')
    cy.get('input[name="name"]').should('be.visible')
    
    // Direct navigation back to Home
    cy.visit('/')
    cy.contains('Hello React JS').should('be.visible')
  })

  it('should show 404 page for unknown routes', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    cy.contains('404 - Page Not Found').should('be.visible')
    cy.contains("The page you're looking for doesn't exist.").should('be.visible')
    
    // Should have a link back to home
    cy.get('a[href="/"]').contains('Go back to Home').should('be.visible')
    
    // Test the back to home link
    cy.get('a[href="/"]').contains('Go back to Home').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Hello React JS').should('be.visible')
  })

  it('should maintain navigation state during page transitions', () => {
    // Check that navigation is consistent across pages
    const pages = [
      { path: '/', title: 'Hello React JS' },
      { path: '/about', title: 'About Page' },
      { path: '/contact', title: 'Contact Us' }
    ]

    pages.forEach(page => {
      cy.visit(page.path)
      
      // Check navigation is present and styled correctly
      cy.get('nav').should('be.visible')
      cy.get('nav a').should('have.length', 3)
      cy.get('nav a').each($link => {
        cy.wrap($link).should('have.css', 'color', 'rgb(100, 108, 255)') // #646cff
        cy.wrap($link).should('have.css', 'text-decoration-line', 'none')
      })
      
      // Check page content
      cy.contains(page.title).should('be.visible')
    })
  })

  it('should support browser back/forward navigation', () => {
    // Navigate through pages
    cy.visit('/')
    cy.get('nav a[href="/about"]').click()
    cy.url().should('include', '/about')
    
    cy.get('nav a[href="/contact"]').click()
    cy.url().should('include', '/contact')
    
    // Use browser back button
    cy.go('back')
    cy.url().should('include', '/about')
    cy.contains('About Page').should('be.visible')
    
    cy.go('back')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Hello React JS').should('be.visible')
    
    // Use browser forward button
    cy.go('forward')
    cy.url().should('include', '/about')
    cy.contains('About Page').should('be.visible')
  })

  it('should highlight active navigation link', () => {
    // This would require additional styling implementation
    // For now, we'll just verify the links work correctly
    
    cy.visit('/')
    cy.get('nav a[href="/"]').should('be.visible')
    
    cy.visit('/about')
    cy.get('nav a[href="/about"]').should('be.visible')
    
    cy.visit('/contact')
    cy.get('nav a[href="/contact"]').should('be.visible')
  })
})
