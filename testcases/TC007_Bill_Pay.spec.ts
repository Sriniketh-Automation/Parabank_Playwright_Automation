import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC007_Bill_Pay');

test.describe('Bill Pay', () => {

  test('TC007 - Pay a bill and verify via API @smoke @regression',
    async ({ loginPage, billPayPage, apiHelper }) => {

    // UI - Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // UI - Navigate to Bill Pay
    await billPayPage.navigateToBillPayPage();

    // Capture fromAccountId before payment for API validation
    const fromAccountId = await billPayPage.getFromAccountId();

    // UI - Fill and submit bill payment
    await billPayPage.payBill(testData.billPayData);
    await billPayPage.verifyPaymentSuccess(
      testData.billPayData.payeeName,
      testData.billPayData.amount
    );

    // API - Verify bill payment transaction exists in backend
    await apiHelper.verifyBillPaymentExists(
      fromAccountId,
      testData.billPayData.payeeName,
      Number(testData.billPayData.amount)
    );

  });

});