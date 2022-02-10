describe('Local Storage', () => {
    it('adds key to local storage after adding an event', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.grid-rows-6 > .bg-opacity-50').click() // today's date
        cy.get('input').type('test123{enter}').should(() => {
            expect(localStorage.getItem('calendar')).to.match(/test123/)
        })
    })

    it('removes key from local storage after deleting event', () => {
        cy.get('.grid-rows-6 > .bg-opacity-50').click()
        cy.get('.items > :nth-child(2) > .h-5 > path').click().should(() => {
            expect(localStorage.getItem('calendar')).to.not.match(/test123/)
        })
    })
})
