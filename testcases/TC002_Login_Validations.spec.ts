import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';


const testData = JsonReader.getData('TC002_Login_Validations');

test.describe('User Login', () => {

  // TC002 - Valid login
  test('TC002 - Login with valid credentials @smoke @regression',
    async ({ loginPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

  });

  // TC003 - Invalid login
  test('TC003 - Login with invalid credentials @regression',
    async ({ loginPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.invalidUser.username,
      testData.invalidUser.password
    );
    await loginPage.verifyLoginError();

  });

  // TC004 - Empty fields
test('TC004 - Login with empty credentials @regression',
  async ({ loginPage }) => {

  await loginPage.goto();
  await loginPage.login(
    testData.emptyUser.username,
    testData.emptyUser.password
  );

  // With empty fields ParaBank stays on login page
  // Verify we are still on login page - not redirected
  await expect(loginPage.page).toHaveURL(/login|index/, { timeout: 10000 });
  await expect(loginPage.loginButton).toBeVisible({ timeout: 10000 });
  console.log('✅ Empty login - stayed on login page as expected');

  });

});