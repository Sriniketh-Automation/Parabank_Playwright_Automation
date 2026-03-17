import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC005_Accounts_Overview');

test.describe('Accounts Overview', () => {

  test('TC005 - Verify Accounts Overview page after login @smoke @regression',
    async ({ loginPage, accountsOverviewPage }) => {

    // Navigate and login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    // Verify login success
    await loginPage.verifyLoginSuccess();

    // Navigate to Accounts Overview
    await accountsOverviewPage.goto();

    // Verify Accounts Overview page
    await accountsOverviewPage.verifyAccountsOverviewPage();

  });

});