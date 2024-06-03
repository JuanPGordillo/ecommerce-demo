import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly title: Locator;
    readonly billingContinueBtn: Locator;
    readonly ratesBtn: Locator;
    readonly shipContinueBtn: Locator;
    readonly paymentContinueBtn: Locator;
    readonly placeOrderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.page-title > h1');
        this.billingContinueBtn = page.locator('#co-billing-form button');
        this.ratesBtn = page.locator('sp-methods li > input');
        this.shipContinueBtn = page.locator('#shipping-method-buttons-container button');
        this.paymentContinueBtn = page.locator('#payment-buttons-container button');
        this.placeOrderBtn = page.locator('#review-buttons-container button');
    }

    async continueToShippingInfo() {
        await this.billingContinueBtn.click();
    }
    async setRate(index: number) {
        await this.ratesBtn.nth(index).check({timeout:10000});
    }
    async continueToPayInfo() {
        await this.shipContinueBtn.click();
    }
    async continueToOrderReview() {
        await this.paymentContinueBtn.click();
    }
    async placeOrder() {
        await this.placeOrderBtn.click();
    }
}