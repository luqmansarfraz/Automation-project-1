// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */

describe('This is first test suite, Luqman Sarfaraz', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        // 29/10/24
        cy.get('input[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Luqman_2024')
        cy.get('input[name="confirm"]').type('Luqman_2024')
        cy.get('#username').type('luqman_sarfraz')
        cy.get('#firstName').type('mickey')
        cy.get('#lastName').type('mouse')
        cy.get('h1').contains('Registration form number 1').click()
        cy.get('.submit_button').should('be.visible')
        cy.get('.submit_button').click()
        cy.get('#input_error_message').should('have.css', 'display', 'none')
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123')
        
        // type('{enter}') is clicking native enter button from thekeyboard
        // for example, to click backspace use '{backspace}'
        cy.get('[name="confirm"]').type('{enter}')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')

        // Assert that password error message is visible, and message should contain 'Passwords do not match!
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')
        // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')

        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.disabled')

        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

    
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

    /*
    Assignment 3: add the content to the following tests
    */

    it('User cannot submit data when phone number is absent', () => {
        cy.get('#username').type('luqman_sarfraz')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')

        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Phone').click()

    
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'title').should('contain', 'Add phone number')
        cy.get('#input_error_message').should('have.css', 'display','none')

    })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
    
        cy.get('#username').type('luqman_sarfraz')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get("input[name='password']").scrollIntoView()
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get("input[name='password']").clear()
        cy.get('[name="confirm"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')


    })

    it('User cannot add letters to phone number', () => {

        cy.get('#username').type('luqman_sarfraz')
        cy.get('[data-testid="phoneNumberTestId"]').type('cerebrum hub')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')

        
    })
})