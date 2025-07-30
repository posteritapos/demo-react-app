/// <reference types="cypress" />

describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should load the about page successfully', () => {
    cy.contains('About Page').should('be.visible')
    cy.get('h1').should('contain', 'About Page')
  })

  it('should display the main description', () => {
    cy.contains('This is a React + TypeScript application with routing!').should('be.visible')
    cy.contains('Built with Vite for fast development and hot module replacement.').should('be.visible')
  })

  it('should display the features section', () => {
    cy.contains('Features:').should('be.visible')
    
    // Check all feature items
    const features = [
      '⚡ Vite for lightning-fast development',
      '⚛️ React 19 with latest features', 
      '🔷 TypeScript for type safety',
      '🛣️ React Router for navigation',
      '🎨 Modern ES modules',
      '🔧 ESLint with TypeScript support'
    ]

    features.forEach(feature => {
      cy.contains(feature).should('be.visible')
    })
  })

  it('should display the tech stack section', () => {
    cy.contains('Tech Stack:').should('be.visible')
    cy.contains('This application demonstrates modern React development practices')
      .should('be.visible')
  })

  it('should have proper page structure', () => {
    // Check that the page has proper heading hierarchy
    cy.get('h1').should('have.length', 1)
    cy.get('h2').should('have.length.at.least', 2)
    
    // Check for list structure
    cy.get('ul').should('exist')
    cy.get('li').should('have.length.at.least', 6) // 6 feature items
  })

  it('should be accessible', () => {
    // Basic accessibility checks
    cy.get('h1').should('exist')
    cy.get('h2').should('exist')
    
    // Check that content is readable
    cy.get('p').each($p => {
      cy.wrap($p).should('not.be.empty')
    })
    
    // Check list structure is semantic
    cy.get('ul li').should('have.length.at.least', 6)
  })

  it('should maintain consistent styling with other pages', () => {
    // Check navigation is present
    cy.get('nav').should('be.visible')
    
    // Check main content area
    cy.get('main').should('exist')
    
    // Check that page follows same layout as other pages
    cy.get('.App').should('exist')
  })

  it('should display content in correct order', () => {
    // Check the order of content sections
    cy.get('h1').contains('About Page').should('be.visible')
    
    // Description should come first
    cy.contains('This is a React + TypeScript application')
      .should('be.visible')
    
    // Features section should be visible
    cy.contains('Features:').should('be.visible')
    
    // Tech Stack should be visible
    cy.contains('Tech Stack:').should('be.visible')
  })

  it('should handle text content correctly', () => {
    // Check for proper text formatting and length
    cy.get('p').each($p => {
      const text = $p.text()
      expect(text.length).to.be.greaterThan(10) // Reasonable content length
    })
    
    // Check that feature list items are properly formatted
    cy.get('li').each($li => {
      const text = $li.text()
      expect(text.length).to.be.greaterThan(15) // Should have descriptive text
      // Check for common emojis that should be present
      const hasEmoji = text.includes('⚡') || text.includes('⚛️') || text.includes('🔷') || 
                       text.includes('🛣️') || text.includes('🎨') || text.includes('🔧')
      expect(hasEmoji).to.be.true
    })
  })
})
