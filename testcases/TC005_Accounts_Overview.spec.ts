import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC005_Accounts_Overview');

test.describe('Accounts Overview', () => {

  test('TC005 - Verify Accounts Overview page after login @smoke @regression',
    async ({ loginPage, accountsOverviewPage }) => {

    // Step 1: Navigate and login
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    // Step 2: Verify login success
    await loginPage.verifyLoginSuccess();

    // Step 3: Navigate to Accounts Overview
    await accountsOverviewPage.goto();

    // Step 4: Verify Accounts Overview page
    await accountsOverviewPage.verifyAccountsOverviewPage();

  });

});