import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

    // Playwright recommends to have locator seprated from the methods
    // So don't need to duplicate locators across methods.
    readonly formLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page:Page){
        super(page)
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem =page.getByText('Smart Table') 
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip') 
    }

    async FormLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        // Playwright recommend not do like this, 
        // instead have the locators inside the constructor
        // But this make things complex because - anti KISS pattern
        // await this.page.getByText('Form Layouts').click() // not this
        await this.formLayoutsMenuItem.click() // but like this
        await this.waitForNumberOfSeconds(2) // usage of wait from helperbase 
    }


    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    /**
     * Helper function to click on the navigation menu only if the menu is collopsed state
     * @param groupItemTitle : String
     */
    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false'){
            await groupMenuItem.click()
        }
    }
}