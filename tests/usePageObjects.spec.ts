import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test('naviagate to forms page', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().FormLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})


test('parametrized methods', async({page})=>{
    const pm = new PageManager(page)

    await pm.navigateTo().FormLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelecteOption("test@test.com", "welcome123", "Option 1")
    await pm.onFormLayoutsPage().submitInlineFormWithNameAndEmailAndCheckbox("Kani", "mozhi", true)
})


test('date picker', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(20)
})


test('date picker range', async({page})=>{
    const pm = new PageManager(page)

    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(0,20)
})