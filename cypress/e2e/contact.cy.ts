/// <reference types="cypress" />

describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should load the contact page successfully', () => {
    cy.contains('Contact Us').should('be.visible')
    cy.get('h1').should('contain', 'Contact Us')
  })

  it('should display the contact form with all required fields', () => {
    cy.get('form').should('be.visible')
    
    // Check form fields
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('textarea[name="message"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible').should('contain', 'Send Message')
    
    // Check labels
    cy.get('label[for="name"]').should('contain', 'Name')
    cy.get('label[for="email"]').should('contain', 'Email')
    cy.get('label[for="message"]').should('contain', 'Message')
  })

  it('should successfully submit a valid form', () => {
    cy.fixture('users').then((users) => {
      const user = users.validUser
      
      // Fill out the form
      cy.fillContactForm(user.name, user.email, user.message)
      
      // Submit the form
      cy.get('button[type="submit"]').click()
      
      // Check for success message
      cy.contains('Thank You!').should('be.visible')
      cy.contains('Your message has been submitted successfully').should('be.visible')
    })
  })

  it('should reset form after successful submission', () => {
    cy.fixture('users').then((users) => {
      const user = users.validUser
      
      // Fill and submit form
      cy.fillContactForm(user.name, user.email, user.message)
      cy.get('button[type="submit"]').click()
      
      // Wait for thank you message
      cy.contains('Thank You!').should('be.visible')
      
      // Wait for form to reset (2 second timeout in component)
      cy.wait(2500) // Wait a bit longer than the timeout
      
      // Check that form is back and empty
      cy.get('input[name="name"]').should('have.value', '')
      cy.get('input[name="email"]').should('have.value', '')
      cy.get('textarea[name="message"]').should('have.value', '')
    })
  })

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click()
    
    // Form should not submit (thank you message should not appear)
    cy.contains('Thank You!').should('not.exist')
    
    // HTML5 validation should prevent submission
    cy.get('input[name="name"]:invalid').should('exist')
    cy.get('input[name="email"]:invalid').should('exist') 
    cy.get('textarea[name="message"]:invalid').should('exist')
  })

  it('should validate email format', () => {
    // Fill form with invalid email
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('textarea[name="message"]').type('This is a test message')
    
    cy.get('button[type="submit"]').click()
    
    // Should not submit due to invalid email
    cy.get('input[name="email"]:invalid').should('exist')
    cy.contains('Thank You!').should('not.exist')
  })

  it('should handle form field interactions correctly', () => {
    // Test typing in each field
    cy.get('input[name="name"]')
      .type('Test User')
      .should('have.value', 'Test User')
    
    cy.get('input[name="email"]')
      .type('test@example.com')
      .should('have.value', 'test@example.com')
    
    cy.get('textarea[name="message"]')
      .type('This is a test message')
      .should('have.value', 'This is a test message')
    
    // Test clearing fields
    cy.get('input[name="name"]').clear().should('have.value', '')
    cy.get('input[name="email"]').clear().should('have.value', '')
    cy.get('textarea[name="message"]').clear().should('have.value', '')
  })

  it('should display contact information section', () => {
    cy.contains('Other Ways to Reach Us:').should('be.visible')
    cy.contains('📧 Email: contact@example.com').should('be.visible')
    cy.contains('📱 Phone: (555) 123-4567').should('be.visible')
    cy.contains('🏢 Address: 123 Tech Street, Dev City, DC 12345').should('be.visible')
  })

  it('should have proper form styling and layout', () => {
    // Check form layout
    cy.get('form').should('have.css', 'max-width', '500px')
    
    // Check field styling
    cy.get('input, textarea').each($field => {
      cy.wrap($field)
        .should('have.css', 'padding', '8px')
        .should('have.css', 'border-radius', '4px')
        .should('have.css', 'font-size', '16px')
    })
    
    // Check button styling
    cy.get('button[type="submit"]')
      .should('have.css', 'background-color', 'rgb(100, 108, 255)') // #646cff
      .should('have.css', 'color', 'rgb(255, 255, 255)')
      .should('have.css', 'border-radius', '4px')
  })

  it('should be accessible', () => {
    // Check form labels are properly associated
    cy.get('input[name="name"]').should('have.attr', 'id', 'name')
    cy.get('label[for="name"]').should('exist')
    
    cy.get('input[name="email"]').should('have.attr', 'id', 'email')
    cy.get('label[for="email"]').should('exist')
    
    cy.get('textarea[name="message"]').should('have.attr', 'id', 'message')
    cy.get('label[for="message"]').should('exist')
    
    // Check required attributes
    cy.get('input[name="name"]').should('have.attr', 'required')
    cy.get('input[name="email"]').should('have.attr', 'required')
    cy.get('textarea[name="message"]').should('have.attr', 'required')
  })

  it('should handle multiple form submissions', () => {
    cy.fixture('users').then((users) => {
      users.testUsers.forEach((user, index) => {
        // Fill and submit form
        cy.fillContactForm(user.name, user.email, user.message)
        cy.get('button[type="submit"]').click()
        
        // Check success message
        cy.contains('Thank You!').should('be.visible')
        
        // Wait for reset if not the last user
        if (index < users.testUsers.length - 1) {
          cy.wait(2500)
          cy.get('input[name="name"]').should('have.value', '')
        }
      })
    })
  })

  it('should maintain form state during interaction', () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message'
    }
    
    // Fill form partially
    cy.get('input[name="name"]').type(testData.name)
    cy.get('input[name="email"]').type(testData.email)
    
    // Click away and come back
    cy.get('h1').click()
    
    // Check values are maintained
    cy.get('input[name="name"]').should('have.value', testData.name)
    cy.get('input[name="email"]').should('have.value', testData.email)
    
    // Complete form
    cy.get('textarea[name="message"]').type(testData.message)
    cy.get('button[type="submit"]').click()
    
    cy.contains('Thank You!').should('be.visible')
  })
})
