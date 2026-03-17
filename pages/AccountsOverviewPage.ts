import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class AccountsOverviewPage {
  readonly page: Page;

  // Locators
  readonly accountsOverviewLink: Locator;
  readonly accountsOverviewHeading: Locator;
  readonly accountTable: Locator;
  readonly accountTableHeader: Locator;
  readonly totalBalance: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.accountsOverviewHeading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountTable = page.locator('#accountTable');
    this.accountTableHeader = page.getByRole('columnheader', { name: 'Account' });
    this.totalBalance = page.getByText('Total');
  }

  // Method to navigate to Accounts Overview
  @step('Click Accounts Overview link')
  async goto() {
    await this.accountsOverviewLink.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to verify accounts overview page loaded
  @step('Verify Accounts Overview page loaded')
  async verifyAccountsOverviewPage() {
    await expect(this.accountsOverviewHeading).toBeVisible({ timeout: 30000 });
    await expect(this.accountTable).toBeVisible({ timeout: 30000 });
    await expect(this.accountTableHeader).toBeVisible({ timeout: 30000 });
    await expect(this.totalBalance).toBeVisible({ timeout: 30000 });
    console.log('✅ Accounts Overview page loaded successfully');
  }

  // Method to verify account exists in table
  @step('Verify account exists in overview table')
  async verifyAccountExists(accountNumber: string) {
    await expect(
      this.page.getByRole('link', { name: accountNumber })
    ).toBeVisible({ timeout: 30000 });
    console.log(`✅ Account ${accountNumber} found in overview`);
  }
}