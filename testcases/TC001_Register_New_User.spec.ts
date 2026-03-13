import { test, expect } from './setup';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC001_Register_New_User');

test('TC001_Register a new user successfully', async ({ registerPage, loginPage }) => {
  await loginPage.goto();
  await loginPage.clickRegister();
  await registerPage.registerNewUser(testData.validRegistration);
});