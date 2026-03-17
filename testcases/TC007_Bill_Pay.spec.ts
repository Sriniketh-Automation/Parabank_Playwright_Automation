import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC007_Bill_Pay');

test.describe('Bill Pay', () => {

  test('TC007 - Pay a bill successfully @smoke @regression',
    async ({ loginPage, billPayPage }) => {

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // Step 2: Navigate to Bill Pay
    await billPayPage.goto();

    // Step 3: Fill and submit bill payment
    await billPayPage.payBill(testData.billPayData);

    // Step 4: Verify payment success
    await billPayPage.verifyPaymentSuccess(
      testData.billPayData.payeeName,
      testData.billPayData.amount
    );

  });

});