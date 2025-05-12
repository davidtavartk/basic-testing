// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  jest.setTimeout(30000);

  const testCases = [0, 50, 100, 1000];
  test('should create account with initial balance', () => {
    testCases.forEach((initialBalance) => {
      const account = new BankAccount(initialBalance);
      expect(account.getBalance()).toBe(initialBalance);
    });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    testCases.forEach((initialBalance) => {
      const account = new BankAccount(initialBalance);
      const withdrawAmount = initialBalance + 1;

      expect(() => account.withdraw(withdrawAmount)).toThrow(
        InsufficientFundsError,
      );
      expect(() => account.withdraw(withdrawAmount)).toThrow(
        `Insufficient funds: cannot withdraw more than ${initialBalance}`,
      );
    });
  });

  test('should throw error when transferring more than balance', () => {
    testCases.forEach((initialBalance) => {
      const sourceAccount = new BankAccount(initialBalance);
      const destinationAccount = new BankAccount(0);
      const transferAmount = initialBalance + 1;

      expect(() =>
        sourceAccount.transfer(transferAmount, destinationAccount),
      ).toThrow(InsufficientFundsError);

      expect(sourceAccount.getBalance()).toBe(initialBalance);
      expect(destinationAccount.getBalance()).toBe(0);
    });
  });

  test('should throw error when transferring to the same account', () => {
    testCases.forEach((initialBalance) => {
      const account = new BankAccount(initialBalance);
      const transferAmount = initialBalance > 0 ? initialBalance / 2 : 10;

      expect(() => account.transfer(transferAmount, account)).toThrow(
        TransferFailedError,
      );
      expect(() => account.transfer(transferAmount, account)).toThrow(
        'Transfer failed',
      );

      expect(account.getBalance()).toBe(initialBalance);
    });
  });

  test('should deposit money', () => {
    testCases.forEach((initialBalance) => {
      const account = new BankAccount(initialBalance);
      const depositAmount = 50;

      account.deposit(depositAmount);

      expect(account.getBalance()).toBe(initialBalance + depositAmount);

      account.deposit(depositAmount);
      expect(account.getBalance()).toBe(initialBalance + depositAmount * 2);
    });
  });

  test('should withdraw money', () => {
    testCases.forEach((initialBalance) => {
      if (initialBalance > 0) {
        const account = new BankAccount(initialBalance);
        const withdrawAmount = initialBalance / 2;

        account.withdraw(withdrawAmount);

        expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
      }
    });
  });

  test('should transfer money', () => {
    testCases.forEach((initialBalance) => {
      if (initialBalance > 0) {
        const sourceAccount = new BankAccount(initialBalance);
        const destinationAccount = new BankAccount(0);
        const transferAmount = initialBalance / 2;

        sourceAccount.transfer(transferAmount, destinationAccount);

        expect(sourceAccount.getBalance()).toBe(
          initialBalance - transferAmount,
        );
        expect(destinationAccount.getBalance()).toBe(transferAmount);
      }
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);

    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
    expect(result).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    const newBalance = 75;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    const initialBalance = account.getBalance();

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    expect(account.getBalance()).toBe(initialBalance);
  });
});
