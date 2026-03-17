import { test, expect } from './base';
import { JsonReader } from '../utils/JsonReader';

const testData = JsonReader.getData('TC012_Request_Loan');

test.describe('Request Loan', () => {

  test('TC012 - Apply for loan and verify approval @smoke @regression',
    async ({ loginPage, requestLoanPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();
    await requestLoanPage.navigateToRequestLoan();
    await requestLoanPage.applyForLoan(
      testData.approvedLoan.amount,
      testData.approvedLoan.downPayment
    );
    await requestLoanPage.verifyLoanApproved();

  });

  test('TC013 - Apply for loan with low down payment and verify denial @regression',
    async ({ loginPage, requestLoanPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();
    await requestLoanPage.navigateToRequestLoan();
    await requestLoanPage.applyForLoan(
      testData.deniedLoanLowDownPayment.amount,
      testData.deniedLoanLowDownPayment.downPayment
    );
    await requestLoanPage.verifyLoanDenied();

  });

  test('TC014 - Apply for loan with insufficient account funds and verify denial @regression',
    async ({ loginPage, requestLoanPage }) => {

    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await loginPage.verifyLoginSuccess();
    await requestLoanPage.navigateToRequestLoan();
    await requestLoanPage.applyForLoan(
      testData.deniedLoanInsufficientFunds.amount,
      testData.deniedLoanInsufficientFunds.downPayment
    );
    await requestLoanPage.verifyLoanDeniedInsufficientFunds();

  });

});