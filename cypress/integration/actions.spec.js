describe('Actions', () => {
    it('adds an event', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.grid-rows-6 > .bg-opacity-50').click() // today's date
        cy.get('input').type('test123{enter}')
        cy.contains('test').should('have.text','test123')
    })
    it('removes an event', () => {
        cy.get('.grid-rows-6 > .bg-opacity-50').click()
        cy.get('.items > :nth-child(2) > .h-5 > path').click()
        cy.get('input').type('{esc}')
    })
    it('edits an event', () => {
        cy.get('.grid-rows-6 > .bg-opacity-50').click()
        cy.get('input').type('test123{enter}')
        cy.get('.grid-rows-6 > .bg-opacity-50').click()
        cy.get('.items > .flex > button > .h-5 > path').click()
        cy.get('.w-72').type('xyz')
        cy.get('.items > .flex > button > .h-5 > path').click()
        cy.get('input').type('{esc}')
        cy.contains('test').should('have.text','test123xyz')
    })
})








