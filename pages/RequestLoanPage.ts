import { Page, Locator, expect } from '@playwright/test';
import { step } from '../testcases/base';

export class RequestLoanPage {
    readonly page: Page;

    readonly requestLoanLink: Locator;
    readonly loanAmountInput: Locator;
    readonly downPaymentInput: Locator;
    readonly fromAccountDropdown: Locator;
    readonly applyNowButton: Locator;
    readonly resultHeading: Locator;
    readonly approvedStatus: Locator;
    readonly deniedStatus: Locator;
    readonly approvedMessage: Locator;
    readonly deniedMessage: Locator;
    readonly insufficientFundsMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
        this.loanAmountInput = page.locator('#amount');
        this.downPaymentInput = page.locator('#downPayment');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
        this.resultHeading = page.getByRole('heading', { name: 'Loan Request Processed' });
        this.approvedStatus = page.getByRole('cell', { name: 'Approved' });
        this.deniedStatus = page.getByRole('cell', { name: 'Denied' });
        this.approvedMessage = page.getByText('Congratulations, your loan has been approved.');
        this.deniedMessage = page.getByText('We cannot grant a loan in that amount with the given down payment.');
        this.insufficientFundsMessage = page.getByText('You do not have sufficient funds for the given down payment.');
    }

    // Method to navigate to Request Loan page
    @step('Navigate to Request Loan page')
    async navigateToRequestLoan() {
        await this.requestLoanLink.click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    // Method to apply for a loan
    @step('Apply for loan with given amount and down payment')
    async applyForLoan(loanAmount: string, downPayment: string) {
        await this.loanAmountInput.fill(loanAmount);
        await this.downPaymentInput.fill(downPayment);
        await this.applyNowButton.click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    // Method to verify loan approved
    @step('Verify loan approved successfully')
    async verifyLoanApproved() {
        await expect(this.resultHeading).toBeVisible({ timeout: 30000 });
        await expect(this.approvedStatus).toBeVisible({ timeout: 30000 });
        await expect(this.approvedMessage).toBeVisible({ timeout: 30000 });
        console.log('Loan approved successfully');
    }

    // Method to verify loan denied due to low down payment
    @step('Verify loan denied due to low down payment')
    async verifyLoanDenied() {
        await expect(this.resultHeading).toBeVisible({ timeout: 30000 });
        await expect(this.deniedStatus).toBeVisible({ timeout: 30000 });
        await expect(this.deniedMessage).toBeVisible({ timeout: 30000 });
        console.log('Loan denied - insufficient down payment');
    }

    // Method to verify loan denied due to insufficient funds
    @step('Verify loan denied due to insufficient funds')
    async verifyLoanDeniedInsufficientFunds() {
        await expect(this.resultHeading).toBeVisible({ timeout: 30000 });
        await expect(this.deniedStatus).toBeVisible({ timeout: 30000 });
        await expect(this.insufficientFundsMessage).toBeVisible({ timeout: 30000 });
        console.log('Loan denied - insufficient account funds');
    }
}