import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC010_Open_New_Account');

test.describe('Open New Account', () => {

  test('TC010 - Open a new Checking account @smoke @regression',
    async ({ loginPage, openNewAccountPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    await openNewAccountPage.navigateToOpenNewAccount();
    await openNewAccountPage.openAccount(testData.checkingAccount.type);
    await openNewAccountPage.verifyAccountOpened();

  });

  test('TC011 - Open a new Savings account and verify details @regression',
    async ({ loginPage, openNewAccountPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    await openNewAccountPage.navigateToOpenNewAccount();
    await openNewAccountPage.openAccount(testData.savingsAccount.type);
    await openNewAccountPage.verifyAccountOpened();
    await openNewAccountPage.verifyNewAccountDetails();

  });

});