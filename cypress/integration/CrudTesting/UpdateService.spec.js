const uri = 'localhost:4200/dashboard';
const back = 'http://localhost:8080/books';
let bookId = '';
const testName = 'updateTest';
const testAuthor = 'updateTest';
const updated = 'updated';

describe('Given I want to update a book', () => {
    
    //Arrange
    before(() => {
        cy.visit(uri)
        cy.request('POST', back, 
        {name:testName, author: testAuthor})
        .then(
            (res) => {
                bookId = res.body.id;
            })
        cy.reload()
    })

    it('update happy path', () => {
        //arrange
        cy.contains('10 / page').click()
        cy.contains('30 / page').click()
        cy.get('tr')
        cy.get('td')
        //Act
        cy.get("td:nth-child(2)").each(($e1, index, $list) => {

            const text = $e1.text();
            if (text.includes(testName)) {
              //grabs the element at the index
              cy.get("td:nth-child(2)").eq(index);
              //selects the edit
              cy.get("button").eq(index + 1).click();    
            }
        })
        
        cy.get('#name').click()
        cy.get('#name').type(updated)
        //Act
        cy.contains('Save').click()

        //Assert
        cy.contains(updated).should('exist')
    })

    after(() => {
        cy.request('DELETE', `${back}/${bookId}`)
    })
})