import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';
import { DbHelper } from '../sql-demo/dbHelper';

const testData = JsonReader.getData('TC020_Hybrid_Validation');

test.describe('Hybrid Validation - UI + API + DB', () => {

  test('TC020 - Transfer funds and verify via UI, API and DB @smoke @regression',
    async ({ loginPage, transferFundsPage, apiHelper }) => {

    const db = new DbHelper();

    // Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // Navigate to Transfer Funds
    await transferFundsPage.navigateToTransferFundsPage();

    // Capture destination account ID
    const toAccountId = await transferFundsPage.getToAccountId();
    console.log(`Destination account: ${toAccountId}`);

    // Get balance BEFORE transfer via API
    const accountBefore = await apiHelper.getAccountDetails(toAccountId);
    console.log(`Balance before transfer: $${accountBefore.balance}`);

    // UI - Perform transfer
    await transferFundsPage.transferFunds(testData.transferAmount);
    await transferFundsPage.verifyTransferSuccess(testData.transferAmount);

    // API - Verify transaction exists
    await apiHelper.verifyTransactionExists(
      toAccountId,
      Number(testData.transferAmount)
    );

    // API - Get balance AFTER transfer
    const accountAfter = await apiHelper.getAccountDetails(toAccountId);
    console.log(`Balance after transfer: $${accountAfter.balance}`);

    // DB - Connect and verify
    await db.connect();

    // DB - Verify transaction exists in MySQL
    const dbTransactionFound = await db.verifyTransactionExists(
      13344,
      Number(testData.transferAmount),
      'Debit'
    );
    expect(dbTransactionFound).toBe(true);

    // DB - Verify total balance in MySQL
    const dbTotalBalance = await db.getTotalBalanceByUsername('john');
    expect(Number(dbTotalBalance)).toBeGreaterThan(0);
    console.log(`DB Total balance verified: $${dbTotalBalance}`);

    await db.disconnect();

  });

});