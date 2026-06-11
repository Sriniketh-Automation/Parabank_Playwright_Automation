# 🎭 ParaBank Hybrid Automation Framework

> **Production-level Test Automation Framework** built with Playwright + TypeScript featuring true Hybrid Validation — UI, REST API & MySQL Database in a single test run.

![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=flat-square&logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-Latest-2EAD33?style=flat-square&logo=playwright)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=flat-square&logo=mysql)
![REST API](https://img.shields.io/badge/API-REST%20Validated-FF6B35?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📌 What This Framework Does

This is not a basic tutorial project. This framework automates a full-stack banking application (**ParaBank**) and validates every action across **three layers simultaneously**:

| Layer | What's Validated |
|-------|-----------------|
| 🖥️ **UI** | Browser interactions via Playwright |
| 🌐 **REST API** | API response verification for every action |
| 🗄️ **MySQL Database** | DB state confirmed after every transaction |

This is what **true end-to-end data integrity** looks like in production automation.

---

## 🏗️ Framework Architecture

```
Parabank_Playwright_Automation/
│
├── .github/
│   └── workflows/          # GitHub Actions CI/CD pipeline
│
├── config/                 # Environment config (base URLs, DB credentials)
│
├── pages/                  # Page Object Model (POM) classes
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── AccountPage.ts
│   ├── FundTransferPage.ts
│   ├── BillPayPage.ts
│   └── TransactionPage.ts
│
├── testcases/              # Test specs organized by module
│   ├── smoke/              # Smoke test suite
│   └── regression/         # Full regression suite
│
├── testdata/               # Externalized JSON test data
│   └── testData.json
│
├── utils/                  # Reusable utilities
│   ├── base.ts             # Fixture-based page injection (test.extend)
│   ├── apiHelper.ts        # REST API validation helpers
│   ├── dbHelper.ts         # MySQL database query helpers
│   └── stepDecorator.ts    # @step decorator for HTML reporting
│
├── sql-demo/               # SQL query demonstrations
│
├── playwright.config.ts    # Global config — env, browsers, retries, reporters
└── package.json
```

---

## ✅ Modules Automated

| Module | Test Coverage |
|--------|--------------|
| 🔐 Registration | New user registration with validation |
| 🔑 Login | Valid/invalid login, session handling |
| 🏦 Account Overview | Balance checks, account listing |
| 💸 Fund Transfer | Transfer between accounts + DB verification |
| 💳 Bill Pay | Payment processing + API + DB validation |
| 📊 Transaction History | Transaction search, filtering, date range |

**20+ test cases** covering positive, negative, and edge case scenarios across all modules.

---

## 🔑 Key Technical Highlights

### 1. Fixture-Based Page Injection (`test.extend`)
Pages are injected via fixtures — no `new Page()` scattered across test files. Clean, maintainable, and scalable.

```typescript
// utils/base.ts
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  // ...more pages
});
```

### 2. Custom `@step` Decorator for Clean HTML Reports
Every test step is automatically labeled in Playwright's HTML report — no manual `test.step()` wrappers needed.

```typescript
// utils/stepDecorator.ts
export function step(stepName?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const name = stepName || propertyKey;
      return await test.step(name, async () => originalMethod.apply(this, args));
    };
  };
}
```

### 3. True Hybrid Validation — UI + API + DB in One Test
```typescript
// After a Fund Transfer UI action:
// ✅ Step 1 — UI confirms transfer success message
await expect(page.locator('.success')).toBeVisible();

// ✅ Step 2 — API confirms transaction was recorded
const apiResponse = await apiHelper.getTransaction(transactionId);
expect(apiResponse.status).toBe(200);

// ✅ Step 3 — Database confirms balance updated
const dbBalance = await dbHelper.getAccountBalance(accountId);
expect(dbBalance).toBe(expectedBalance);
```

### 4. Externalized JSON Test Data
Zero hardcoded data in test files. All test inputs live in `testdata/testData.json`.

```json
{
  "validUser": {
    "username": "testuser",
    "password": "Test@1234"
  },
  "transferAmount": 500,
  "billPayee": {
    "name": "Electric Company",
    "accountNumber": "123456"
  }
}
```

### 5. Environment-Based Configuration
Switch environments with a single variable — no code changes needed.

```typescript
// playwright.config.ts
use: {
  baseURL: process.env.ENV === 'staging'
    ? 'https://staging.parabank.com'
    : 'https://parabank.parasoft.com',
}
```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

Every push to `main` automatically:

```yaml
# .github/workflows/playwright.yml
- Installs dependencies
- Runs Smoke tests first (fast feedback)
- Runs full Regression suite in parallel
- Generates HTML report artifact
- Uploads test results
```

**Parallel execution** across multiple workers cuts regression time significantly.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MySQL (for DB validation tests)
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/Sriniketh-Automation/Parabank_Playwright_Automation.git

# Navigate to project
cd Parabank_Playwright_Automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run smoke tests only
npx playwright test --grep @smoke

# Run regression tests
npx playwright test --grep @regression

# Run with HTML report
npx playwright test --reporter=html

# Run specific module
npx playwright test testcases/fundtransfer
```

### View HTML Report

```bash
npx playwright show-report
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Playwright** | Browser automation |
| **TypeScript** | Type-safe test development |
| **MySQL** | Database state validation |
| **REST API** | API layer validation |
| **GitHub Actions** | CI/CD pipeline |
| **Git** | Version control |
| **Allure / HTML Reporter** | Test reporting |

---

## 📊 Test Execution Report

The framework generates detailed HTML reports with:
- ✅ Pass/Fail status per test
- 📸 Screenshots on failure
- 🎬 Video recordings (configurable)
- 📝 Step-by-step execution trace
- ⏱️ Execution time per test

---

## 👤 Author

**Sriniketh Sundarrajan**
QA Automation Engineer | SDET | Playwright Specialist

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/sriniketh-sundarrajan)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/Sriniketh-Automation)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:nikethreigns777sk@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.

---

> *"Quality is not an act, it is a habit."* — Built with production-grade standards, not just for learning.
