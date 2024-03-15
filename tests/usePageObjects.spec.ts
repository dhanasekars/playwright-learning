import {test, expect} from '@playwright/test';
import {NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test('naviagate to forms page', async({page})=>{
    const navigateTo = new NavigationPage(page)
    await navigateTo.FormLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})


test('parametrized methods', async({page})=>{
    const navigateTo = new NavigationPage(page)
    const onFormsLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.FormLayoutsPage()
    await onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelecteOption("test@test.com", "welcome123", "Option 1")
    await onFormsLayoutsPage.submitInlineFormWithNameAndEmailAndCheckbox("Kani", "mozhi", true)
})