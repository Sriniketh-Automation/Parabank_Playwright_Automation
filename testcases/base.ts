import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { BillPayPage } from '../pages/BillPayPage';
import { ApiHelper } from '../utils/apiHelper';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { RequestLoanPage } from '../pages/RequestLoanPage';

export type TestOptions = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  accountsOverviewPage: AccountsOverviewPage;
  transferFundsPage: TransferFundsPage;
  billPayPage: BillPayPage;
  apiHelper: ApiHelper;
  transactionHistoryPage: TransactionHistoryPage;
  openNewAccountPage: OpenNewAccountPage;
  requestLoanPage: RequestLoanPage;

};

export const test = base.extend<TestOptions>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },
  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },
  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },
  transactionHistoryPage: async ({ page }, use) => {
    await use(new TransactionHistoryPage(page));
  },
  requestLoanPage: async ({ page }, use) => {
  await use(new RequestLoanPage(page));
},

  // It automatically shares the browser session/cookies!
  apiHelper: async ({ request }, use) => {
    await use(new ApiHelper(request));
  },

});

export { expect } from '@playwright/test';

// Step decorator
export function step(stepName?: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(this: any, ...args: any) {
      const name = `${stepName || (context.name as string)} (${this.constructor.name})`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}