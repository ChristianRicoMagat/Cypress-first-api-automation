/// <reference types="cypress" />

describe('', () =>{

    it.only('TC003 - POST user info', () => {

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users/',
            headers: {
                'authorization': "Bearer c8d653b9501e56011bf66070c208c44065bd787ef20f69d84617f2c4c0388a0d"
            },
            body: {
                "email": "takte@gmail.com",
                "name": "API test automation",
                "gender": "male",
                "status": "active"
            }
         }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('name', 'API test automation')
            expect(res.body).has.property('email', 'takte@gmail.com')
            expect(res.body).has.property('gender', 'male')
            expect(res.body).has.property('status', 'active')

        })

    })
})