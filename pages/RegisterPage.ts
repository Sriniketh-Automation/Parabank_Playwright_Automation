import { Page, Locator } from '@playwright/test';
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
  }

  // Method to fill registration form and submit
  @step('Fill and submit registration form')
  async registerNewUser(testData: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }) {
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
    await this.registerButton.click();
  }
}   