const uri = 'localhost:4200/dashboard';
const back = 'http://localhost:8080/books';
const testName = 'deleteTest';
const testAuthor = 'deleteTest';

describe('Given I want to delete a book', () => {
    
    //Arrange
    before(() => {
        cy.visit(uri)
        cy.request('POST', back, {name:testName, author: testAuthor})
        cy.reload()
    })
    
    it('delete happy path', () => {
        //arrange
        cy.contains('10 / page').click()
        cy.contains('30 / page').click()
        cy.get('tr')
        cy.get('td')
        cy.get("td:nth-child(2)").each(($e1, index, $list) => {

            const text = $e1.text();
            if (text.includes(testName)) {
              //grabs the element at the index
              cy.get("td:nth-child(2)").eq(index);
              //selects the checkbox
              cy.get("input").eq(index + 1).check();    
            }
        })
        
        //Act
        cy.contains('Delete').click()

        //Assert
        cy.contains(testName).should('not.exist')
    })
})