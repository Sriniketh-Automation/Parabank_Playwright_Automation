import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class OpenNewAccountPage {
  readonly page: Page;

  readonly openNewAccountLink: Locator;
  readonly accountTypeDropdown: Locator;
  readonly fromAccountDropdown: Locator;
  readonly openNewAccountButton: Locator;
  readonly successHeading: Locator;
  readonly successMessage: Locator;
  readonly newAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.successHeading = page.getByRole('heading', { name: 'Account Opened!' });
    this.successMessage = page.getByText('Congratulations, your account is now open.');
    this.newAccountLink = page.locator('#newAccountId');
  }

  // Method to navigate to Open New Account page
  @step('Navigate to Open New Account page')
  async navigateToOpenNewAccount() {
    await this.openNewAccountLink.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to open a new account
  @step('Open new account with given type')
  async openAccount(accountType: string) {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await this.accountTypeDropdown.selectOption(accountType);

    // Wait for fromAccount dropdown to load
    await expect(this.fromAccountDropdown).toBeVisible({ timeout: 30000 });
    await this.openNewAccountButton.click();
  }

  // Method to verify account opened successfully
  @step('Verify new account opened successfully')
  async verifyAccountOpened() {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await expect(this.successHeading).toBeVisible({ timeout: 30000 });
    await expect(this.successMessage).toBeVisible({ timeout: 30000 });
    const newAccountId = await this.newAccountLink.textContent();
    console.log(`New account opened successfully: ${newAccountId}`);
    return newAccountId;
  }

  // Method to verify new account details after opening
  @step('Verify new account details page')
  async verifyNewAccountDetails() {
    await this.newAccountLink.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await expect(this.page.getByRole('heading', { name: 'Account Details' }))
      .toBeVisible({ timeout: 30000 });
    await expect(this.page.getByText('Balance: $100.00'))
      .toBeVisible({ timeout: 30000 });
    console.log('New account details verified - Balance $100.00 confirmed');
  }
}