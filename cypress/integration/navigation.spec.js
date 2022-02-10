import moment from 'moment'

describe('Navigation', () => {
    let currentMonth = moment().add(0, 'month').format('MMMM')
    let currentYear = moment().add(0, 'month').format('y')
    let prevMonth = moment().add(-1, 'month').format('MMMM')
    let prevMonthYear = moment().add(-1, 'month').format('y')
    let nextMonth = moment().add(1, 'month').format('MMMM')
    let nextMonthYear = moment().add(1, 'month').format('y')

    it('displays current month & year', () => {
        cy.visit('http://localhost:3000/')
        cy.contains(currentMonth).should('have.text',`${currentMonth} ${currentYear}`)
    })

    it('navigates to previous month', () => { 
        cy.get(':nth-child(1) > .h-8').click()
        cy.contains(prevMonth).should('have.text',`${prevMonth} ${prevMonthYear}`)
    })

    it('navigates to next month', () => { 
        cy.get(':nth-child(2) > .h-8').click().click()
        cy.contains(nextMonth).should('have.text',`${nextMonth} ${nextMonthYear}`)
    })
})
