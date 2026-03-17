import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC001_Register_New_User');

test.describe('User Registration', () => {

  test('TC001 - Register new user and verify auto login @smoke @regression',
    async ({ loginPage, registerPage }) => {

    // Step 1: Navigate to login page
    await loginPage.goto();

    // Step 2: Click Register link
    await loginPage.clickRegister();

    // Step 3: Fill and submit registration form
    await registerPage.registerNewUser(testData.validRegistration);

    // Step 4: Verify auto login after registration
    // ParaBank automatically logs in after successful registration
    await loginPage.verifyLoginSuccess();

  });

});