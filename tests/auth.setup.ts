import { test as setup, expect } from '@playwright/test';
import user from '../.auth/user.json'
import fs from 'fs'


const authFile = '.auth/user.json'

setup('authentication', async({page,request})=>{
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data:{
            "user":{"email": process.env.USERNAME, "password":process.env.PASSWORD}
        }
    })
    expect(response.status()).toEqual(200)   
    const responseBody = await response.json()
    const accessToken = responseBody.user.token 
    user.origins[0].localStorage[0].value = accessToken
    // console.log(accessToken)
    // fs.writeFileSync(authFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken
})