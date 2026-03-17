import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC006_Transfer_Funds');

test.describe('Transfer Funds', () => {

  test('TC006 - Transfer funds between accounts @smoke @regression',
    async ({ loginPage, transferFundsPage }) => {

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // Step 2: Navigate to Transfer Funds
    await transferFundsPage.goto();

    // Step 3: Perform transfer
    await transferFundsPage.transferFunds(
      testData.transferData.amount,
      testData.transferData.toAccount
    );

    // Step 4: Verify transfer success
    await transferFundsPage.verifyTransferSuccess(
      testData.transferData.amount
    );

  });

});