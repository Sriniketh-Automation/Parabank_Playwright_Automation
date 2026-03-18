import { test, expect } from '@playwright/test';
import { DbHelper } from './dbHelper';

test.describe('Database Validation', () => {

  test('TC019 - Verify customer and account data in MySQL @regression',
    async () => {

    const db = new DbHelper();
    await db.connect();

    // Verify customer exists in DB
    const customer = await db.getCustomerByUsername('john');
    expect(customer).toBeTruthy();
    expect(customer.first_name).toBe('John');
    expect(customer.last_name).toBe('Smith');
    console.log(`DB - Customer verified: ${customer.first_name} ${customer.last_name}`);

    // Verify account exists in DB
    const accounts = await db.getAccountById(13344);
    expect(accounts).toBeTruthy();
    console.log(`DB - Account 13344 verified`);

    // Verify transactions exist in DB
    const transactions = await db.getTransactionsByUsername('john');
    expect(transactions.length).toBeGreaterThan(0);
    console.log(`DB - Transactions verified: ${transactions.length} found`);

    // Verify total balance
    const totalBalance = await db.getTotalBalanceByUsername('john');
    expect(Number(totalBalance)).toBeGreaterThan(0);

    await db.disconnect();

  });

});