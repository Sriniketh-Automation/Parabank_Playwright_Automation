import { test as base, expect } from './base';

// Define test data type
type TestData = {
  data: {
    validUser: { username: string; password: string };
    invalidUser: { username: string; password: string };
  };
};

// Adds test data as a fixture
export const test = base.extend<TestData>({
  data: async ({}, use) => {
    await use({
      validUser: {
        username: 'john',
        password: 'demo',
      },
      invalidUser: {
        username: 'wronguser',
        password: 'wrongpass',
      },
    });
  },
});

export { expect } from '@playwright/test';