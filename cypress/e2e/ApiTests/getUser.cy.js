/// <reference types="cypress" />

describe('TC001 - Get API user', () => {

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

    it('TC002 - GET user info by user ID 3985', () =>{

        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users/3985',
            headers : {
                'authorization' : "Bearer" + accessToken
            }
    
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq('Meghnad Trivedi')
            expect(res.body.email).to.eq('meghnad_trivedi@marvin-farrell.io')
            expect(res.body.status).to.eq('active')
        })
    })

})