import { type Locator, type Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly welcomeMessage: Locator;
    readonly item: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly itemImage: Locator;
    readonly slideShowNext: Locator;
    readonly slideShowPrev: Locator;
    readonly slideActive: Locator;
    readonly actualImage: Locator;
    readonly navElements: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = page.locator('.welcome-msg');
        this.item = page.locator('.item');
        this.itemName = page.locator('.product-name > a');
        this.itemPrice = page.locator('.regular-price');
        this.itemImage = page.locator('.item img');
        this.slideShowNext = page.locator('.slideshow-next');
        this.slideShowPrev = page.locator('.slideshow-prev');
        this.slideActive = page.locator('.cycle-slide-active');
        this.actualImage = page.locator('.cycle-slide-active a > img');
        this.navElements = page.locator('.nav-primary > li');
    }

    async navigate(baseUrl: string) {
        await this.page.goto(baseUrl);
    }
    async openItem(index: number) {
        await this.itemName.nth(index).click();
    }
    async nextSlide() {
        await this.slideShowNext.click();
    }
    async prevSlide() {
        await this.slideShowPrev.click();
    }
    async hoverNavElement(index: number) {
        await this.navElements.nth(index).hover();
    }
    async openFirstItem() {
        await this.itemName.nth(0).click({force:true});
    }
}