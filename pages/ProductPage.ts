import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productColor: Locator;
    readonly productSize: Locator;
    readonly quantityBtn: Locator;
    readonly addToCartBtn: Locator;
    readonly cartIcon: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.product-name > h1');
        this.productPrice = page.locator('.price-info .price');
        this.productColor = page.locator('#configurable_swatch_color > li');
        this.productSize = page.locator('#configurable_swatch_size > li');
        this.quantityBtn = page.locator('#qty');
        this.addToCartBtn = page.locator('.add-to-cart-buttons button');
        this.cartIcon = page.locator('[data-target-element="#header-cart"]');
        this.cartItems = page.locator('#cart-sidebar > li');
    }

    async navigate(baseUrl: string) {
        await this.page.goto(baseUrl);
    }
    async setQuantity(amount: number) {
        await this.quantityBtn.clear();
        await this.quantityBtn.fill(amount.toString());
    }
    async setSize(index: number) {
        const sizeElements = await this.productSize.all();
        if (index < sizeElements.length) {
          await sizeElements[index].click();
        } else {
          await sizeElements[0].click();
        }
    }
    async setColor(index: number) {
        const colorElements = await this.productColor.all();
        if (index < colorElements.length) {
            await colorElements[index].click();
        } else {
            await colorElements[0].click(); 
        }
    }
    async addToCart() {
        await this.addToCartBtn.click();
    }
    async openCart() {
        await this.cartIcon.click();
    }
}