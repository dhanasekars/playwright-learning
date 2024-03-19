import { test as setup, expect } from '@playwright/test';
import user from '../.auth/user.json'
import fs from 'fs'


const authFile = '.auth/user.json'

setup('authentication', async({page,request})=>{

    // await page.goto('https://conduit.bondaracademy.com/')
    // await page.waitForTimeout(500) 
    // await page.getByText('Sign in').click()
    // await page.getByRole('textbox', {name:"Email"}).fill('test@kani.com')
    // await page.getByRole('textbox', {name:"Password"}).fill('welcome1')
    // await page.waitForTimeout(500)
    // await page.getByRole('button').click()
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
    
    // await page.context().storageState({path: authFile})

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data:{
            "user":{"email": "test@kani.com", "password": "welcome1"}
        }
    })
    expect(response.status()).toEqual(200)   
    const responseBody = await response.json()
    const accessToken = responseBody.user.token 
    user.origins[0].localStorage[0].value = accessToken
    console.log(accessToken)
    fs.writeFileSync(authFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken
})