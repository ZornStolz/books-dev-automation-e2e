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

        //Delete tracks
        //cy.request('DELETE', `${back}/${bookId}`)
    })

    after(() => {
        cy.request('DELETE', `${back}/${bookId}`)
    })

    //it.only('Change my mind and want to close the modal without the button', () =>{
    //    cy.get('.ant-modal-close-x').click()
    //    cy.get('.ant-modal-close-x').click().should('to.be.undefined')
    //    expect($el).to.have.html('cdk-global-scrollblock')
    //})
//
    //it('Change my mind and want to close the modal with cancel button', () =>{
    //    cy.contains('Cancel').click()
    //    cy.get('.ant-modal-close-x').click().should('to.be.undefined')
    //})
})