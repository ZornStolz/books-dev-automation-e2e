const uri = 'localhost:4200/dashboard';
const back = 'http://localhost:8080/books';
const testId = '123-abc';
const testName = 'testUI';
const testAuthor = 'testUI';

describe('Given I want to add a book', () => {
    
    //Arrange
    before(() => {
        cy.visit(uri)
        cy.contains('Add').click()
    })

    it('add happy path', () => {
        cy.get('#name').click()
        cy.get('#name').type(testName)
        cy.get('#author').type(testAuthor)
        //Act
        cy.contains('Save').click()

        cy.intercept('POST', back, {
            body: {id:testId, name:testName, author:testAuthor}
          })

        //Assert

        cy.contains(testName).should('exist')
    })
})