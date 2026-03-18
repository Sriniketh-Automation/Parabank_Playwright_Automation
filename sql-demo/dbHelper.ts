import mysql from 'mysql2/promise';

export class DbHelper {

  private connection: mysql.Connection | null = null;

  private config = {
    host: 'localhost',
    user: 'root',
    password: 'Sriniketh.0422',
    database: 'parabank_demo'
  };

  // Method to connect to database
  async connect() {
    this.connection = await mysql.createConnection(this.config);
    console.log('Connected to MySQL database');
  }

  // Method to disconnect from database
  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      console.log('Disconnected from MySQL database');
    }
  }

  // Method to get account details by account ID
  async getAccountById(accountId: number) {
    const [rows] = await this.connection!.execute(
      'SELECT * FROM accounts WHERE id = ?',
      [accountId]
    );
    return rows;
  }

  // Method to get all transactions for an account
  async getTransactionsByAccountId(accountId: number) {
    const [rows] = await this.connection!.execute(
      'SELECT * FROM transactions WHERE account_id = ?',
      [accountId]
    );
    return rows;
  }

  // Method to verify transaction exists
  async verifyTransactionExists(accountId: number, amount: number, type: string) {
    const [rows]: any = await this.connection!.execute(
      'SELECT * FROM transactions WHERE account_id = ? AND amount = ? AND type = ?',
      [accountId, amount, type]
    );
    const found = rows.length > 0;
    console.log(`DB - Transaction of $${amount} (${type}) in account ${accountId}: ${found ? 'Found' : 'Not Found'}`);
    return found;
  }

  // Method to get customer by username
  async getCustomerByUsername(username: string) {
    const [rows]: any = await this.connection!.execute(
      'SELECT * FROM customers WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  // Method to get total balance for a customer
  async getTotalBalanceByUsername(username: string) {
    const [rows]: any = await this.connection!.execute(
      `SELECT SUM(a.balance) as total_balance 
       FROM customers c 
       JOIN accounts a ON c.id = a.customer_id 
       WHERE c.username = ?`,
      [username]
    );
    console.log(`DB - Total balance for ${username}: $${rows[0].total_balance}`);
    return rows[0].total_balance;
  }

  // Method to get all transactions for a customer using JOIN
  async getTransactionsByUsername(username: string) {
    const [rows]: any = await this.connection!.execute(
      `SELECT c.first_name, t.description, t.amount, t.type 
       FROM customers c 
       JOIN accounts a ON c.id = a.customer_id 
       JOIN transactions t ON a.id = t.account_id 
       WHERE c.username = ?`,
      [username]
    );
    console.log(`DB - Total transactions for ${username}: ${rows.length}`);
    return rows;
  }
}