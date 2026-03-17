import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class FindTransactionsPage {
  readonly page: Page;

  readonly findTransactionsLink: Locator;
  readonly accountDropdown: Locator;
  readonly transactionIdInput: Locator;
  readonly findByTransactionIdButton: Locator;
  readonly amountInput: Locator;
  readonly findByAmountButton: Locator;
  readonly transactionDateInput: Locator;
  readonly findByDateButton: Locator;
  readonly resultsHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
    this.accountDropdown = page.locator('#accountId');
    this.transactionIdInput = page.locator('#transactionId');
    this.findByTransactionIdButton = page.getByRole('button', { name: 'Find Transactions' }).first();
    this.amountInput = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');
    this.transactionDateInput = page.locator('#transactionDate');
    this.findByDateButton = page.locator('#findByDate');
    this.resultsHeading = page.getByRole('heading', { name: 'Transaction Results' });
  }

  // Method to navigate to Find Transactions page
  @step('Navigate to Find Transactions page')
  async navigateToFindTransactions() {
    await this.findTransactionsLink.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to find transaction by amount
  @step('Find transactions by amount')
  async findByAmount(amount: string) {
    await this.amountInput.fill(amount);
    await this.findByAmountButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to find transaction by date
  @step('Find transactions by date')
  async findByDate(date: string) {
    await this.transactionDateInput.fill(date);
    await this.findByDateButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  // Method to verify transaction results are displayed
  @step('Verify transaction results are displayed')
  async verifyTransactionResults() {
    await expect(this.resultsHeading).toBeVisible({ timeout: 30000 });
    await expect(this.page.getByRole('table')).toBeVisible({ timeout: 30000 });
    console.log('Transaction results displayed successfully');
  }
}