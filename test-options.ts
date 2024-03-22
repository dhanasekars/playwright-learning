import {test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions ={
  formLayoutsPage: string
  pageManger:PageManager
}

export const test = base.extend<TestOptions>({
  formLayoutsPage: async({page}, use)=>{
    await page.goto(process.env.URL)
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await use('')
    console.log('Tear Down')
  },
/*
if you want to load this fixture only in case a page manager fixture is working, you can create
a dependency between the fixtures. Now pagemanger will trigger formsLayoutPage to intialise, then pageManager gets intialised
*/
  pageManger: async({page, formLayoutsPage}, use) =>{
    const pm = new PageManager(page)
    await use(pm)
  }

})

/*
  Fixture are powerful way in playwright for setting up the environment
  You can visually feel the difference in speed of execution with and without using fixtures
  How to create?
  custom fixtures extending the base `test` object
  Then pass fixtures inside of the test and use them inside the test
  many fixtures can be created
  Dependencies between two fixture methods can be managed, like formLayoutsPage is depends on pageManager
  Sequence of execution inside fixture method `formLayoutsPage`
  All methods and commands before the `use` block will be executed as precondition before running the test, setting up environment
  Everything after `use` works as teardown, executed after completing the test
  1. Intialise formLayoutsPage fixture methods (everything before `use`)
  2. Intialise pageManager fixture methods( everyhing before `use`)
  3. run the test
  4. Page Manger tear down ( everything after `use`)
  5. formLayoutsPage tear down( everyhing after `use`) - this is when 'Tear Down' console log gets printed
 */
