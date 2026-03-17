import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class LoginPage {
    readonly page: Page;

    // Login form locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    // Link locators
    readonly forgotLoginLink: Locator;
    readonly registerLink: Locator;

    // Post login locators

    readonly accountServicesMenu: Locator;
    readonly errorMessage: Locator;
    readonly errorHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Login form
        this.usernameInput = this.page.locator('input[name="username"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.getByRole('button', { name: 'Log In' });

        // Links
        this.forgotLoginLink = this.page.getByRole('link', { name: 'Forgot login info?' });
        this.registerLink = this.page.getByRole('link', { name: 'Register' });

        // Post login

        this.accountServicesMenu = this.page.locator('#leftPanel');

        this.errorMessage = page.getByText('The username and password could not be verified.');
        this.errorHeading = page.getByRole('heading', { name: 'Error!' });
    }

    // Method to navigate to ParaBank login page
    @step('Navigate to ParaBank login page')
    async goto() {
        await this.page.goto('/parabank/index.htm');
    }

    // Method to login with credentials
    @step('Login with username and password')
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Method to click Register link
    @step('Click Register link')
    async clickRegister() {
        await this.registerLink.click();
    }

    // Method to click Forgot Login link
    @step('Click Forgot Login link')
    async clickForgotLogin() {
        await this.forgotLoginLink.click();
    }
    // Method to verify successful login
    @step('Verify login success - Account Services visible')
    async verifyLoginSuccess() {
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        await expect(this.accountServicesMenu).toBeVisible({ timeout: 30000 });
        console.log('✅ Login successful - Account Services menu visible');
    }
    // Method to verify failed login error message
    @step('Verify login error message')
    async verifyLoginError() {
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        await expect(this.errorHeading).toBeVisible({ timeout: 30000 });
        await expect(this.errorMessage).toBeVisible({ timeout: 30000 });
        console.log('✅ Login error message verified');
    }


}