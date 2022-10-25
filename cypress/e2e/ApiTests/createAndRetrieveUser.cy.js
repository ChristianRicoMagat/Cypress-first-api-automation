/// <reference types="cypress" />

//locate custom fixture
const createUser = require("../../fixtures/createUser")

describe('Public API Automation - create and retrieve user info', () => {
//define variables
    let accessToken = 'c8d653b9501e56011bf66070c208c44065bd787ef20f69d84617f2c4c0388a0d'
    let randomText = ""
    let testEmail = ""
//validating api successful response
    it('TC001 - GET users info', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/',
            headers: {
                'authorization': "Bearer" + accessToken
            }
// validating status code of the response
        }).then((res) => {
            expect(res.status).to.eq(200)
        })
    })

//create user using POST and validating info using GET
    it('T002 - create a user using POST and validate using GET', () => {

//function to generate a random string for user email
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
//append the random generated string to @gmail.com
        testEmail = randomText + '@gmail.com'
//calling custom fixture and creating a payload
        cy.fixture('createuser').then((payload) => {

//creating payload request and sending via POST
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": payload.name,
                    "gender": payload.gender,
                    "email": testEmail,
                    "status": payload.status
                }
//store response into JSON format variable
            }).then((res) => {
                cy.log(JSON.stringify(res))
//retrieve the newly created user id and store to userId variable
                const userId = res.body.data.id

                cy.log("user id is: " + userId)
//validating the response from POST request
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name', payload.name)
                expect(res.body.data).has.property('status', payload.status)
                expect(res.body.data).has.property('gender', payload.gender)
//validate the newly created user info by using GET by appending the userId in the url
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/' + userId,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
//validate the response from GET request
                }).then((res) => {
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id', userId)
                    expect(res.body.data).has.property('name', payload.name)
                    expect(res.body.data).has.property('status', payload.status)
                    expect(res.body.data).has.property('email', testEmail)
                })

            })


        })
    })

})