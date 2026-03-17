import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class BillPayPage {
    readonly page: Page;

    // Locators
    readonly billPayLink: Locator;
    readonly payeeNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneInput: Locator;
    readonly accountInput: Locator;
    readonly verifyAccountInput: Locator;
    readonly amountInput: Locator;
    readonly fromAccountDropdown: Locator;
    readonly sendPaymentButton: Locator;
    readonly successHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
        this.payeeNameInput = page.locator('input[name="payee.name"]');
        this.addressInput = page.locator('input[name="payee.address.street"]');
        this.cityInput = page.locator('input[name="payee.address.city"]');
        this.stateInput = page.locator('input[name="payee.address.state"]');
        this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
        this.phoneInput = page.locator('input[name="payee.phoneNumber"]');
        this.accountInput = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
        this.amountInput = page.locator('input[name="amount"]');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
        this.successHeading = page.getByRole('heading', { name: 'Bill Payment Complete' });
    }

    // Method to navigate to Bill Pay page
    @step('Navigate to Bill Pay page')
    async goto() {
        await this.billPayLink.click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    // Method to fill and submit bill payment form
    @step('Fill and submit bill payment form')
    async payBill(testData: any) {
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        await this.payeeNameInput.fill(testData.payeeName);
        await this.addressInput.fill(testData.address);
        await this.cityInput.fill(testData.city);
        await this.stateInput.fill(testData.state);
        await this.zipCodeInput.fill(testData.zipCode);
        await this.phoneInput.fill(testData.phone);
        await this.accountInput.fill(testData.account);
        await this.verifyAccountInput.fill(testData.account);
        await this.amountInput.fill(testData.amount);
        await this.sendPaymentButton.click();
    }

    @step('Verify bill payment completed successfully')
    async verifyPaymentSuccess(payeeName: string, amount: string) {
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        await expect(this.successHeading).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByText(
            `Bill Payment to ${payeeName} in the amount of $${amount}.00`
        )).toBeVisible({ timeout: 30000 });
        console.log(`✅ Bill payment of $${amount} to ${payeeName} completed successfully`);
    }
}