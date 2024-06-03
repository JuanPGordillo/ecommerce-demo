import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly loginBtn: Locator;
    readonly title: Locator;
    readonly accountDropdown: Locator;
    readonly logoutBtn: Locator;
    readonly errorMessage: Locator;
    readonly requiredMailError: Locator;
    readonly requiredPassError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.locator('#email');
        this.inputPassword = page.locator('#pass');
        this.loginBtn = page.locator('#send2');
        this.title = page.locator('.page-title > h1');
        this.accountDropdown = page.locator('[data-target-element="#header-account"]');
        this.logoutBtn = page.locator('#header-account li > a[title="Log Out"]');
        this.errorMessage = page.locator('.error-msg span')
        this.requiredMailError = page.locator('#advice-required-entry-email');
        this.requiredPassError = page.locator('#advice-required-entry-pass');

    }

    async navigate(baseUrl) {
        await this.page.goto(baseUrl + 'customer/account/login/');
    }
    async login(username, password) {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.loginBtn.click();
    }
    async logout() {
        await this.accountDropdown.click();
        await this.logoutBtn.click();
    }
}