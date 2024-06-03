import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';

test.beforeEach('Perform login', async ({ loginpage, page, context}) => {
    await context.clearCookies();
    await loginpage.navigate(process.env.BASE_URL);
    await loginpage.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(loginpage.title).toHaveText('My Dashboard');
    page.context().storageState({ path: './LoginAuth.json' });
});

test.use({ storageState: './LoginAuth.json' });
test('Validate slide functionality', async ({ basepage }) => {
    await basepage.navigate(process.env.BASE_URL);
    await expect(basepage.welcomeMessage).toHaveText('Welcome, Test Test Test!')

    const imgElement = await basepage.actualImage;
    const altText = await imgElement.getAttribute('alt');
    await basepage.nextSlide();
    await expect(basepage.slideActive).toBeVisible();
    await expect(basepage.slideActive).toHaveCount(1);
    const altText2 = await imgElement.getAttribute('alt');

    expect(altText2).not.toBe(altText);
});
test('Validate nav dropdown', async ({ basepage, page }) => {
    await basepage.navigate(process.env.BASE_URL);
    await expect(basepage.welcomeMessage).toHaveText('Welcome, Test Test Test!')

    const navElements = await basepage.navElements.all();
    const dropdown = await navElements[0].locator('ul.level0');
    await basepage.hoverNavElement(0);
    await expect(navElements[0]).toHaveClass(/.*menu-active/);
    await expect(dropdown).toBeVisible();
});
test('Validate add an item to the cart and checkout', async ({ basepage, productpage, cartpage, checkoutpage, page }) => {
    await basepage.navigate(process.env.BASE_URL);
    await expect(basepage.welcomeMessage).toHaveText('Welcome, Test Test Test!')

    await page.evaluate(() => {
        window.scrollBy(0, 30000);
    });
    const url = await basepage.itemName.first().getAttribute('href');
    await productpage.navigate(url);
    await productpage.setQuantity(2);
    await productpage.setColor(1);
    await productpage.setSize(0);
    await productpage.addToCart();
    await productpage.openCart();

    await expect(cartpage.title).toHaveText('Shopping Cart', {timeout:10000});
    await cartpage.selectRegion('New York');
    await cartpage.setZipCode('10172');
    await page.evaluate(() => {
        window.scrollBy(0, 30000);
    });
    await cartpage.proceedCheckout();

    await expect(checkoutpage.title).toHaveText('Checkout', {timeout:10000});
    await checkoutpage.continueToShippingInfo();
    await checkoutpage.setRate(0);
    await checkoutpage.continueToPayInfo();
    await checkoutpage.continueToOrderReview();
    await checkoutpage.placeOrder();
    await expect(checkoutpage.title).toHaveText('Your Order Has Been Received', {timeout:10000});
    await expect(page).toHaveURL(/.*success/);
});
