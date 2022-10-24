/// <reference types="cypress" />

const createUser = require("../../fixtures/createUser")

describe('TC001 - Get API user', () => {

    let accessToken = 'c8d653b9501e56011bf66070c208c44065bd787ef20f69d84617f2c4c0388a0d'
    let randomText = ""
    let testEmail = ""

    it('TC001 - GET users info', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/',
            headers: {
                'authorization': "Bearer" + accessToken
            }

        }).then((res) => {
            expect(res.status).to.eq(200)
        })
    })

    // it('TC002 - GET user info by user ID 3985', () => {

    //     cy.request({
    //         method: 'GET',
    //         url: 'https://gorest.co.in/public/v2/users/3985',
    //         headers: {
    //             'authorization': "Bearer" + accessToken
    //         }

    //     }).then((res) => {
    //         expect(res.status).to.eq(200)
    //         expect(res.body.name).to.eq('Meghnad Trivedi')
    //         expect(res.body.email).to.eq('meghnad_trivedi@marvin-farrell.io')
    //         expect(res.body.status).to.eq('active')
    //     })
    // })

    it('TC002 - POST user info', () => {

        var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=random.charAt(Math.floor(Math.random()*random.length));
        testEmail = randomText + '@gmail.com'


        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users/',
            headers: {
                'authorization': 'Bearer ' + accessToken
            },
            body: {
                "email": testEmail,
                "name": createUser.name,
                "gender": createUser.gender,
                "status": createUser.status
            }
         }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('name', createUser.name)
            expect(res.body).has.property('email', testEmail)
            expect(res.body).has.property('gender', createUser.gender)
            expect(res.body).has.property('status', createUser.status)

        })

    })
    
})