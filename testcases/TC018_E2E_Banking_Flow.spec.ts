import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC018_E2E_Banking_Flow');

test.describe('End to End Banking Flow', () => {

  test('TC018 - Open account, transfer funds and verify via API @smoke @regression',
    async ({ loginPage, openNewAccountPage, transferFundsPage, apiHelper }) => {

    // Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // Open new Savings account
    await openNewAccountPage.navigateToOpenNewAccount();
    await openNewAccountPage.openAccount(testData.newAccount.type);
    const newAccountId = await openNewAccountPage.verifyAccountOpened();
    console.log(`New account created: ${newAccountId}`);

    // Navigate to Transfer Funds
    await transferFundsPage.navigateToTransferFundsPage();

    // Transfer funds to new account
    await transferFundsPage.transferFundsToAccount(
      testData.transferAmount,
      newAccountId!
    );
    await transferFundsPage.verifyTransferSuccess(testData.transferAmount);

    // Verify via API - transaction exists in new account
    await apiHelper.verifyTransactionExists(
      newAccountId!,
      Number(testData.transferAmount)
    );

    // Step 6: Verify via API - new account balance updated
    await apiHelper.verifyAccountBalance(
      newAccountId!,
      Number(testData.transferAmount)
    );

  });

});