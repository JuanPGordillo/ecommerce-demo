import { test as playwrightTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export * from '@playwright/test';

export const test = playwrightTest.extend({
    loginpage: async({page},use) => {
        await use(new LoginPage(page));
    },
    basepage: async({page},use) => {
        await use(new BasePage(page));
    },
    productpage: async({page},use) => {
        await use(new ProductPage(page));
    },
    cartpage: async({page},use) => {
        await use(new CartPage(page));
    },
    checkoutpage: async({page},use) => {
        await use(new CheckoutPage(page));
    }
})