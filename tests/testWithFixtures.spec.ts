// import {test} from '@playwright/test'
import {test} from '../test-options' // the base test is extended here from test, so call this instead of playwright test
import {faker} from '@faker-js/faker'


// test.beforeEach(async({page})=>{
//   await page.goto(process.env.URL)
// })


test('parametrized methods', async({pageManger})=>{
  const randomFullName = faker.person.fullName()
  const randomEmailId = `${randomFullName.replace(/ /g, '.').toLowerCase()}${faker.number.int(100)}@${faker.person.firstName().toLowerCase()}.com`

  // await pm.navigateTo().FormLayoutsPage()
  await pageManger.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelecteOption(process.env.USERNAME, process.env.PASSWORD, "Option 1")
  await pageManger.onFormLayoutsPage().submitInlineFormWithNameAndEmailAndCheckbox(randomFullName, randomEmailId, true)
})
