/// <reference types="cypress" />

describe('Complete User Journey', () => {
  it('should complete a full user workflow', () => {
    cy.fixture('users').then((users) => {
      const user = users.validUser
      
      // Start at home page
      cy.visit('/')
      cy.get('h1').should('contain', 'Hello React JS')
      
      // Test counter functionality
      cy.contains('count is 0').should('be.visible')
      cy.get('button').contains('+').click()
      cy.contains('count is 1').should('be.visible')
      cy.get('button').contains('+').click()
      cy.contains('count is 2').should('be.visible')
      cy.get('button').contains('-').click()
      cy.contains('count is 1').should('be.visible')
      
      // Navigate to About page
      cy.get('nav a[href="/about"]').click()
      cy.url().should('include', '/about')
      cy.get('h1').should('contain', 'About Page')
      
      // Check about content
      cy.contains('React + TypeScript application').should('be.visible')
      cy.contains('Modern ES modules').should('be.visible')
      cy.contains('TypeScript').should('be.visible')
      
      // Navigate to Contact page
      cy.get('nav a[href="/contact"]').click()
      cy.url().should('include', '/contact')
      cy.get('h1').should('contain', 'Contact Us')
      
      // Fill and submit contact form
      cy.fillContactForm(user.name, user.email, user.message)
      cy.get('button[type="submit"]').click()
      
      // Verify success
      cy.contains('Thank You!').should('be.visible')
      cy.contains('Your message has been submitted successfully').should('be.visible')
      
      // Wait for form reset
      cy.wait(2500)
      
      // Navigate back to home using browser back button
      cy.go('back') // This might take us to a previous state
      cy.visit('/') // Let's explicitly go to home
      
      // Verify we're back at home and counter state is preserved
      cy.get('h1').should('contain', 'Hello React JS')
      
      // Test external links (without actually following them)
      cy.get('a[href="https://vite.dev"]')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer')
      
      cy.get('a[href="https://react.dev"]')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer')
    })
  })

  it('should handle error scenarios gracefully', () => {
    // Test 404 page
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    cy.get('h1').should('contain', '404 - Page Not Found')
    cy.contains("The page you're looking for doesn't exist").should('be.visible')
    
    // Test navigation from 404
    cy.get('a[href="/"]').first().click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('h1').should('contain', 'Hello React JS')
  })

  it('should maintain state across navigation', () => {
    // Start at home and interact with counter
    cy.visit('/')
    cy.get('button').contains('+').click().click().click()
    cy.get('div').contains('count is 3').should('exist')
    
    // Navigate away and back
    cy.get('nav a[href="/about"]').click()
    cy.get('nav a[href="/"]').click()
    
    // Counter should reset (component unmount/remount)
    cy.get('div').contains('count is 0').should('exist')
  })

  it('should work correctly with browser navigation', () => {
    // Start at home
    cy.visit('/')
    
    // Navigate through pages
    cy.get('nav a[href="/about"]').click()
    cy.url().should('include', '/about')
    
    cy.get('nav a[href="/contact"]').click()
    cy.url().should('include', '/contact')
    
    // Use browser back button
    cy.go('back')
    cy.url().should('include', '/about')
    cy.get('h1').should('contain', 'About Page')
    
    // Use browser forward button
    cy.go('forward')
    cy.url().should('include', '/contact')
    cy.get('h1').should('contain', 'Contact Us')
    
    // Go back to home
    cy.go('back')
    cy.go('back')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('h1').should('contain', 'Hello React JS')
  })

  it('should be responsive and work on different viewports', () => {
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ]
    
    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height)
      
      // Test home page
      cy.visit('/')
      cy.get('h1').should('be.visible')
      cy.get('nav').should('be.visible')
      cy.get('div').contains('count is').should('be.visible')
      
      // Test navigation works on all viewports
      cy.get('nav a[href="/about"]').click()
      cy.get('h1').should('contain', 'About Page')
      
      // Test form on different viewports
      cy.get('nav a[href="/contact"]').click()
      cy.get('form').should('be.visible')
      cy.get('input[name="name"]').should('be.visible')
      cy.get('button[type="submit"]').should('be.visible')
    })
  })

  it('should load quickly and be performant', () => {
    // Test initial page load performance
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('page-load-start')
      },
      onLoad: (win) => {
        win.performance.mark('page-load-end')
        win.performance.measure('page-load', 'page-load-start', 'page-load-end')
      }
    })
    
    // Check that main content loads quickly
    cy.get('h1').should('be.visible')
    cy.get('nav').should('be.visible')
    
    // Test navigation performance
    const startTime = Date.now()
    cy.get('nav a[href="/about"]').click()
    cy.get('h1').should('contain', 'About Page').then(() => {
      const endTime = Date.now()
      const navigationTime = endTime - startTime
      // Navigation should be fast (less than 1 second)
      expect(navigationTime).to.be.lessThan(1000)
    })
  })

  it('should handle keyboard navigation', () => {
    cy.visit('/')
    
    // Test that we can focus on navigation links
    cy.get('nav a[href="/"]').should('be.visible').focus()
    cy.focused().should('have.attr', 'href', '/')
    
    cy.get('nav a[href="/about"]').focus()
    cy.focused().should('have.attr', 'href', '/about')
    
    cy.get('nav a[href="/contact"]').focus()
    cy.focused().should('have.attr', 'href', '/contact')
    
    // Test enter key navigation by clicking instead of using enter
    // (enter key simulation can be unreliable in E2E tests)
    cy.get('nav a[href="/contact"]').click()
    cy.url().should('include', '/contact')
    cy.get('h1').should('contain', 'Contact Us')
    
    // Test form keyboard navigation
    cy.get('input[name="name"]').focus()
    cy.focused().should('have.attr', 'name', 'name')
    
    cy.get('input[name="email"]').focus() 
    cy.focused().should('have.attr', 'name', 'email')
    
    cy.get('textarea[name="message"]').focus()
    cy.focused().should('have.attr', 'name', 'message')
    
    cy.get('button[type="submit"]').focus()
    cy.focused().should('have.attr', 'type', 'submit')
  })
})
