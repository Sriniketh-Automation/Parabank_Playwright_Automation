-- Query 1: Get all accounts with customer details
SELECT c.first_name, c.last_name, a.type, a.balance
FROM customers c
JOIN accounts a ON c.id = a.customer_id;

-- Query 2: Get all transactions for a specific customer
SELECT c.first_name, t.description, t.amount, t.type
FROM customers c
JOIN accounts a ON c.id = a.customer_id
JOIN transactions t ON a.id = t.account_id
WHERE c.username = 'john';

-- Query 3: Total balance per customer
SELECT c.first_name, c.last_name, SUM(a.balance) as total_balance
FROM customers c
JOIN accounts a ON c.id = a.customer_id
GROUP BY c.id;

-- Query 4: Find all debit transactions above $100
SELECT * FROM transactions
WHERE type = 'Debit' AND amount > 100;

-- Query 5: Count transactions per account
SELECT account_id, COUNT(*) as total_transactions, SUM(amount) as total_amount
FROM transactions
GROUP BY account_id;