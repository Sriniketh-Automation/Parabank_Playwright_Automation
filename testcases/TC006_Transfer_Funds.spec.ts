import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC006_Transfer_Funds');

test.describe('Transfer Funds', () => {

  test('TC006 - Transfer funds and verify via API @smoke @regression',
    async ({ loginPage, transferFundsPage, apiHelper }) => {

    // UI - Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // UI - Navigate to Transfer Funds
    await transferFundsPage.navigateToTransferFundsPage();

    // Capture toAccountId before transfer for API validation
    const toAccountId = await transferFundsPage.getToAccountId();

    // UI - Perform transfer and verify
    await transferFundsPage.transferFunds(testData.transferData.amount);
    await transferFundsPage.verifyTransferSuccess(testData.transferData.amount);

    // API - Verify transaction exists in backend
    await apiHelper.verifyTransactionExists(
      toAccountId,
      Number(testData.transferData.amount)
    );

  });

});