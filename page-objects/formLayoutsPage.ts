import { Page } from '@playwright/test'

export class FormLayoutsPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

/**
 * This method will fill out the Using The Grid Form
 * @param email valid email address of the test user
 * @param password valid password for the test user
 * @param optionText Choose the radio button option
 */
    async submitUsingTheGridFormWithCredentialsAndSelecteOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox',{name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true}) // force true, because class="native-input visually-hidden"
        await usingTheGridForm.getByRole('button').click()
    }
    /**
     * This method will fill out the inline forms with user details
     * @param name first and last name
     * @param email valid email id
     * @param rememberMe true of false to remember the user session
     */
    async submitInlineFormWithNameAndEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const usingInlineForm = this.page.locator('nb-card', {hasText:'Inline form'})
        await usingInlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await usingInlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await usingInlineForm.getByRole('checkbox').check({force: true})
        await usingInlineForm.getByRole('button').click()
    }
}