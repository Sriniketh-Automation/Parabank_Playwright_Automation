import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC016_Find_Transactions');

test.describe('Find Transactions', () => {

  test('TC016 - Find transactions by amount @smoke @regression',
    async ({ loginPage, findTransactionsPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    await findTransactionsPage.navigateToFindTransactions();
    await findTransactionsPage.findByAmount(testData.searchByAmount.amount);
    await findTransactionsPage.verifyTransactionResults();

  });

  test('TC017 - Find transactions by date @regression',
    async ({ loginPage, findTransactionsPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();

    await findTransactionsPage.navigateToFindTransactions();
    await findTransactionsPage.findByDate(testData.searchByDate.date);
    await findTransactionsPage.verifyTransactionResults();

  });

});