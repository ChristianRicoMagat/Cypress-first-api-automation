/// <reference types="cypress" />

const { has } = require("cypress/types/lodash")

describe('Post user', function(){
    
    let accessToken = 'b14fb3131cfb4e1cb3171283637f917ac35bdf35026c07da4df0331f169cf8c2'
    it('TC001 - GET users info', () =>{

        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users/',
            headers : {
                'authorization' : "Bearer" + accessToken
            }
    
        }).then((res)=>{
            expect(res.status).to.eq(200)
        })
    })
})