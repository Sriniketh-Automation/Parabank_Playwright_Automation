import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class TransactionHistoryPage {
  readonly page: Page;

  readonly accountsOverviewLink: Locator;
  readonly accountDetailsHeading: Locator;
  readonly accountActivityHeading: Locator;
  readonly transactionDetailsHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.accountDetailsHeading = page.getByRole('heading', { name: 'Account Details' });
    this.accountActivityHeading = page.getByRole('heading', { name: 'Account Activity' });
    this.transactionDetailsHeading = page.getByRole('heading', { name: 'Transaction Details' });
  }

  // Method to navigate to Accounts Overview
  @step('Navigate to Accounts Overview')
  async navigateToAccountsOverview() {
    await this.accountsOverviewLink.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to click on an account to view details
  @step('Click account to view account details')
  async clickAccount(accountId: string) {
    await this.page.getByRole('link', { name: accountId }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to click first transaction in the list
  @step('Click first transaction to view details')
  async clickFirstTransaction() {
    await this.page.getByRole('link', { name: 'Funds Transfer Sent' }).first().click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to verify account details page
  @step('Verify account details page loaded')
  async verifyAccountDetailsPage(accountId: string) {
    await expect(this.accountDetailsHeading).toBeVisible({ timeout: 30000 });
    await expect(this.accountActivityHeading).toBeVisible({ timeout: 30000 });
    await expect(this.page.getByText(`Account Number: ${accountId}`))
      .toBeVisible({ timeout: 30000 });
    console.log(`Account details verified for account: ${accountId}`);
  }

  // Method to verify transaction details page
  @step('Verify transaction details page loaded')
  async verifyTransactionDetailsPage() {
    await expect(this.transactionDetailsHeading).toBeVisible({ timeout: 30000 });
    await expect(this.page.getByText('Transaction ID:')).toBeVisible({ timeout: 30000 });
    await expect(this.page.getByText('Amount:')).toBeVisible({ timeout: 30000 });
    console.log('Transaction details page verified');
  }
}