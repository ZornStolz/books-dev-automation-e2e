const uri = 'localhost:4200/dashboard';
const back = 'http://localhost:8080/books';
let bookId = '';
const testName = 'updateTest';
const testAuthor = 'updateTest';
const updated = 'updated';

describe('Given I want to update a book', () => {
    
    //Arrange
    beforeEach(() => {
        cy.visit(uri)
        cy.request('POST', back, 
        {name:testName, author: testAuthor})
        .then(
            (res) => {
                bookId = res.body.id;
            })
        cy.reload()

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
              //selects the edit
              cy.get("button").eq(index + 2).click();    
            }
        })
    })

    it('update happy path', () => {
        
        cy.get('#name').click()
        cy.get('#name').clear()
        cy.get('#name').type(updated)
        //Act
        cy.contains('Save').click()

        //Assert
        cy.contains(updated).should('exist')
    })

    //bug updated should be found becasuse blank spaces should not be allowed. Still it was found.
    it('Update with blanck space', () => {
        cy.get('#name').click()
        cy.get('#name').clear()
        cy.get('#author').clear()
        cy.get('#name').type(' ')
        cy.get('#author').type(' ')
        //Act
        cy.contains('Save').click()

        //Assert
        cy.contains(updated).should('exist')
    })

    afterEach(() => {
        cy.request('DELETE', `${back}/${bookId}`)
    })
})