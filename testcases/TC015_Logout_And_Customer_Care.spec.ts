import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC015_Logout_And_Customer_Care');

test.describe('Logout and Customer Care', () => {

  test('TC015 - Logout and submit Customer Care form @smoke @regression',
    async ({ loginPage }) => {

    // Login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    // Logout
    await loginPage.logout();
    await loginPage.verifyLogout();

    // Navigate to Customer Care
    await loginPage.navigateToCustomerCare();

    // Fill and submit form
    await loginPage.submitCustomerCareForm(testData.customerCare);

    // Verify success
    await loginPage.verifyCustomerCareSuccess();

  });

});