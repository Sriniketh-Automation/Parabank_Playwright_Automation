import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class RegisterPage {
  readonly page: Page;

  // Registration form locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly welcomeHeading: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form fields
    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });

    // Success locators
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome/ });
    this.successMessage = page.getByText(
      'Your account was created successfully. You are now logged in.'
    );
  }

  // Method to fill and submit registration form
  @step('Fill and submit registration form')
  async registerNewUser(testData: any) {
    // Wait for registration form to fully load
    await this.page.waitForLoadState('domcontentloaded');

    await this.firstNameInput.fill(testData.firstName);
    await this.lastNameInput.fill(testData.lastName);
    await this.addressInput.fill(testData.address);
    await this.cityInput.fill(testData.city);
    await this.stateInput.fill(testData.state);
    await this.zipCodeInput.fill(testData.zipCode);
    await this.phoneInput.fill(testData.phone);
    await this.ssnInput.fill(testData.ssn);
    await this.usernameInput.fill(testData.username);
    await this.passwordInput.fill(testData.password);
    await this.confirmPasswordInput.fill(testData.password);

    // Wait before clicking register button
    await this.page.waitForLoadState('domcontentloaded');
    await this.registerButton.click();
  }

  // Method to verify registration success
  @step('Verify registration success message')
async verifyRegistrationSuccess(username: string) {
  await this.page.waitForURL('**/parabank/**', { timeout: 60000 });
  await this.page.waitForLoadState('networkidle', { timeout: 60000 });

  await expect(this.welcomeHeading).toContainText(
    `Welcome ${username}`, { timeout: 60000 }
  );
  await expect(this.successMessage).toBeVisible({ timeout: 60000 });
  console.log(`✅ Registration successful for user: ${username}`);
}
}