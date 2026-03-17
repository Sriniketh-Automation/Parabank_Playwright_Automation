import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class TransferFundsPage {
    readonly page: Page;

    // Locators
    readonly transferFundsLink: Locator;
    readonly amountInput: Locator;
    readonly fromAccountDropdown: Locator;
    readonly toAccountDropdown: Locator;
    readonly transferButton: Locator;
    readonly successHeading: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.amountInput = page.locator('#amount');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.toAccountDropdown = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.successHeading = page.getByRole('heading', { name: 'Transfer Complete!' });
        this.successMessage = page.locator('#showResult p').first();
    }

    // Method to navigate to Transfer Funds page
    @step('Navigate to Transfer Funds page')
    async navigateToTransferFundsPage() {
        await this.transferFundsLink.click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    // Method to transfer funds between accounts
    @step('Transfer funds between accounts')
    async transferFunds(amount: string) {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
        await expect(this.page.getByRole('heading', { name: 'Transfer Funds' }))
            .toBeVisible({ timeout: 30000 });

        await this.amountInput.fill(amount);

        // Select first available option in toAccount dropdown dynamically
        const options = await this.toAccountDropdown.locator('option').all();
        if (options.length > 0) {
            const firstOptionValue = await options[0].getAttribute('value');
            await this.toAccountDropdown.selectOption({ value: firstOptionValue! });
        }

        await this.transferButton.click();
    }

    // Method to verify transfer success
    @step('Verify transfer completed successfully')
    async verifyTransferSuccess(amount: string) {
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        await expect(this.successHeading).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByText(`$${amount}.00 has been transferred`))
            .toBeVisible({ timeout: 30000 });
        console.log(`✅ Transfer of $${amount} completed successfully`);
    }
}