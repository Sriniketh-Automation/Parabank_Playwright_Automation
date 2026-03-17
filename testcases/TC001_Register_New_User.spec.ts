import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC001_Register_New_User');

test.describe('User Registration', () => {

  test('TC001 - Register new user and verify auto login @smoke @regression',
    async ({ loginPage, registerPage }) => {

    // Navigate to login page
    await loginPage.goto();

    // Click Register link
    await loginPage.clickRegister();

    // Fill and submit registration form
    await registerPage.registerNewUser(testData.validRegistration);

    // Verify auto login after registration
    // ParaBank automatically logs in after successful registration
    await loginPage.verifyLoginSuccess();

  });

});