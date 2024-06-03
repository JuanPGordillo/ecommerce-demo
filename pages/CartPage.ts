import { type Locator, type Page } from '@playwright/test';

export class CartPage { 
    readonly page: Page;
    readonly title: Locator;
    readonly message: Locator;
    readonly removeItem: Locator;
    readonly emptyCartBtn: Locator;
    readonly continueBtn: Locator;
    readonly discountInput: Locator;
    readonly applyBtn: Locator;
    readonly country: Locator;
    readonly region: Locator;
    readonly zipCode: Locator;
    readonly estimateBtn: Locator;
    readonly rates: Locator;
    readonly cartTotalPrices: Locator;
    readonly checkoutBtn: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.locator('.page-title > h1');
        this.message = page.locator('.messages span');
        this.removeItem = page.locator('.product-cart-remove > a');
        this.emptyCartBtn = page.locator('#empty_cart_button');
        this.continueBtn = page.locator('.btn-continue');
        this.discountInput = page.locator('#coupon_code');
        this.applyBtn = page.locator('.discount-form button[title="Apply"]');
        this.country = page.locator('#country');
        this.region = page.locator('#region_id');
        this.zipCode = page.locator('#postcode');
        this.estimateBtn = page.locator('button[title="Estimate"]');
        this.rates = page.locator('#co-shipping-method-form');
        this.cartTotalPrices = page.locator('#shopping-cart-totals-table .price');
        this.checkoutBtn = page.locator('.cart-totals button');
    }

    async navigate(baseUrl: string) {
        await this.page.goto(baseUrl);
    }
    async selectRegion(region: string) {
        await this.region.selectOption(region);
    }
    async setZipCode(zipcode: string) {
        await this.zipCode.fill(zipcode);
    }
    async estimateShip() {
        await this.estimateBtn.click();
    }
    async proceedCheckout() {
        await this.checkoutBtn.click({force:true});
    }
}
