import {expect, test} from '@playwright/test'

 test.beforeEach('the first test', async ({page})=>{
   await page.goto('http://localhost:4200/')
   await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()
 })


 test('extracing values', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText:"Basic Form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    console.log(allRadioButtonsLabels)

    //input value
    const emailField = basicForm.getByRole('textbox', {name:"Email"})
    await emailField.fill('kani@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('kani@test.com')
 })