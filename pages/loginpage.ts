import { Page, Locator } from '@playwright/test';
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
  readonly errorMessage: Locator;
  readonly accountServicesMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login form
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });

    // Links
    this.forgotLoginLink = page.getByRole('link', { name: 'Forgot login info?' });
    this.registerLink = page.getByRole('link', { name: 'Register' });

    // Post login
    this.errorMessage = page.locator('.error');
    this.accountServicesMenu = page.locator('#leftPanel');
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
}