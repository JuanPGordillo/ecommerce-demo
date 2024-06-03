import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';

test('Should login', async ({ loginpage, page }) => {
    await loginpage.navigate(process.env.BASE_URL);
    await loginpage.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(loginpage.title).toHaveText('My Dashboard');
});

test('Should logout', async ({ loginpage, page }) => {
    await loginpage.navigate(process.env.BASE_URL);
    await loginpage.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(loginpage.title).toHaveText('My Dashboard');
    await loginpage.logout();
    await expect(loginpage.title).toHaveText('You are now logged out');
});

test('Should display error message', async ({ loginpage }) => {
    await loginpage.navigate(process.env.BASE_URL);
    await loginpage.login("invalide@email.com", "invalid_password");
    await expect(loginpage.errorMessage).toHaveText('Invalid login or password.');
});

test('Should display username is required message', async ({ loginpage }) => {
    await loginpage.navigate(process.env.BASE_URL);
    await loginpage.login("", "invalid_password");
    await expect(loginpage.requiredMailError).toBeVisible();
    await expect(loginpage.requiredMailError).toHaveCount(1);
});

test('Should display password is required message', async ({ loginpage }) => {
    await loginpage.navigate(process.env.BASE_URL);
    await loginpage.login("invalide@email.com", "");
    await expect(loginpage.requiredPassError).toBeVisible();
    await expect(loginpage.requiredPassError).toHaveCount(1);
});