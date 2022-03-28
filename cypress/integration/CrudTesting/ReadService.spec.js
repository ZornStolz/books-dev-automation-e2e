const uri = 'localhost:4200/dashboard';

describe ('Check if the aplication is loaded properly', () => {
    before(() => {
        //Arrange
        cy.visit(uri)
    })
    
    it('The GET petition to load the Overview returns a 200', () => {
        
        //Act
        let back = 'http://localhost:8080/books'
        cy.request('GET', back).then ((res) => {
            //Assert
            expect(res.status).to.equal(200)
        })
    })

    it('The data was loaded', () => {
        cy.get('.ant-table-cell')
    })
})