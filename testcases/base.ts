import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { BillPayPage } from '../pages/BillPayPage';

export type TestOptions = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  accountsOverviewPage: AccountsOverviewPage;
  transferFundsPage: TransferFundsPage;
  billPayPage: BillPayPage;
  
};

export const test = base.extend<TestOptions>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);
    await use(accountsOverviewPage);
  },
  transferFundsPage: async ({ page }, use) => {
  const transferFundsPage = new TransferFundsPage(page);
  await use(transferFundsPage);
},
billPayPage: async ({ page }, use) => {
  const billPayPage = new BillPayPage(page);
  await use(billPayPage);
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