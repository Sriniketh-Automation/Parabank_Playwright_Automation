import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { RegisterPage } from '../pages/RegisterPage';

// Define all page fixture types
export type TestOptions = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

// Extend base test with page fixtures
export const test = base.extend<TestOptions>({

  // Fixture for LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture for RegisterPage
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

});

export { expect } from '@playwright/test';

// Step decorator - wraps methods in test.step automatically
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