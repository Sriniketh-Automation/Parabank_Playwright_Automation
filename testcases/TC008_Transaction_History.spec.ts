import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC008_Transaction_History');

test.describe('Transaction History', () => {

  test('TC008 - View account details and transaction history @smoke @regression',
    async ({ loginPage, transactionHistoryPage }) => {

    // Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // Navigate to Accounts Overview
    await transactionHistoryPage.navigateToAccountsOverview();

    // Click on account to view details
    await transactionHistoryPage.clickAccount(testData.accountId);

    // Verify account details page
    await transactionHistoryPage.verifyAccountDetailsPage(testData.accountId);

  });

  test('TC009 - View individual transaction details @regression',
    async ({ loginPage, transactionHistoryPage }) => {

    // Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // Navigate to Accounts Overview
    await transactionHistoryPage.navigateToAccountsOverview();

    // Click on account
    await transactionHistoryPage.clickAccount(testData.accountId);

    // Click first transaction
    await transactionHistoryPage.clickFirstTransaction();

    // Verify transaction details page
    await transactionHistoryPage.verifyTransactionDetailsPage();

  });

});