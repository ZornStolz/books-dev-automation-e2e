const uri = 'localhost:4200/dashboard';
const back = 'http://localhost:8080/books';
const testName = 'testUI';
const testAuthor = 'testUI';
let bookId = '';

describe('Given I want to add a book', () => {
    
    //Arrange
    before(() => {
        cy.visit(uri)
        cy.contains('Add').click()
    })

    it('add happy path', () => {
        //arrange
        cy.intercept('POST', back, (req) => {
            req.reply( res =>{
                bookId = res.body.id;
            })
          }).as('PostBook')

        cy.get('#name').click()
        cy.get('#name').type(testName)
        cy.get('#author').type(testAuthor)
        
        //Act
        cy.contains('Save').click()
        cy.wait('@PostBook')

        //Assert
        cy.contains(testName).should('exist')
    })

    after(() => {
        cy.request('DELETE', `${back}/${bookId}`)
    })
})