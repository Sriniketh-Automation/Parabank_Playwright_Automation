import { APIRequestContext, expect } from '@playwright/test';

export class ApiHelper {

    private request: APIRequestContext;
    private baseURL = 'https://parabank.parasoft.com/parabank/services/bank';
    private headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    // Method to get account details by account ID
    async getAccountDetails(accountId: string) {
        const response = await this.request.get(
            `${this.baseURL}/accounts/${accountId}`,
            { headers: this.headers }
        );
        console.log(`API Status: ${response.status()}`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(`Account ${accountId} | Type: ${data.type} | Balance: $${data.balance}`);
        return data;
    }
    // Method to get transactions for an account
    async getAccountTransactions(accountId: string) {
        const response = await this.request.get(
            `${this.baseURL}/accounts/${accountId}/transactions`,
            { headers: this.headers }
        );
        console.log(`API Status: ${response.status()}`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(`Account ${accountId} | Total transactions: ${data.length}`);
        return data;
    }
    //Method to verify transaction exists in account transactions
    async verifyTransactionExists(accountId: string, amount: number) {
        const transactions = await this.getAccountTransactions(accountId);
        const transactionFound = transactions.some(
            (txn: any) => Math.abs(txn.amount) === amount
        );
        expect(transactionFound,
            `Transaction of $${amount} not found in account ${accountId}`
        ).toBe(true);
        console.log(`Transaction of $${amount} verified in account: ${accountId}`);
        return transactionFound;
    }
    // Method to verify account balance is greater than or equal to expected amount
    async verifyAccountBalance(accountId: string, expectedBalance: number) {
        const account = await this.getAccountDetails(accountId);
        expect(account.balance).toBeGreaterThanOrEqual(expectedBalance);
        console.log(`Balance verified | Expected: $${expectedBalance} | Actual: $${account.balance}`);
    }

    //Method to verify bill payment transaction exists in account
    async verifyBillPaymentExists(accountId: string, payeeName: string, amount: number) {
        const transactions = await this.getAccountTransactions(accountId);
        const transactionFound = transactions.some(
            (txn: any) =>
                txn.description === `Bill Payment to ${payeeName}` &&
                Math.abs(txn.amount) === amount
        );
        expect(transactionFound,
            `Bill payment of $${amount} to ${payeeName} not found in account ${accountId}`
        ).toBe(true);
        console.log(`Bill payment of $${amount} to ${payeeName} verified in account: ${accountId}`);
        return transactionFound;
    }
}