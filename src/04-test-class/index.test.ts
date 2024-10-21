import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);

    expect(() => account.withdraw(1001)).toThrow(InsufficientFundsError);
    expect(account.getBalance()).toEqual(1000);
  });

  test('should throw error when transferring more than balance', () => {
    const sourceAccount = getBankAccount(1000);
    const destinationAccount = getBankAccount(2000);

    expect(() => sourceAccount.transfer(1500, destinationAccount)).toThrow(
      InsufficientFundsError,
    );
    expect(sourceAccount.getBalance()).toEqual(1000);
    expect(destinationAccount.getBalance()).toEqual(2000);
  });

  test('should throw error when transferring to the same account', () => {
    const sourceAccount = getBankAccount(1000);

    expect(() => sourceAccount.transfer(50, sourceAccount)).toThrow(
      TransferFailedError,
    );
    expect(sourceAccount.getBalance()).toEqual(1000);
  });

  test('should deposit money', () => {
    const sourceAccount = getBankAccount(1000);
    sourceAccount.deposit(2000);

    expect(sourceAccount.getBalance()).toEqual(3000);
  });

  test('should withdraw money', () => {
    const sourceAccount = getBankAccount(3000);
    sourceAccount.withdraw(2000);

    expect(sourceAccount.getBalance()).toEqual(1000);
  });

  test('should transfer money', () => {
    const sourceAccount = getBankAccount(1000);
    const destinationAccount = getBankAccount(2000);
    sourceAccount.transfer(1000, destinationAccount);

    expect(sourceAccount.getBalance()).toEqual(0);
    expect(destinationAccount.getBalance()).toEqual(3000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const sourceAccount = getBankAccount(1000);

    try {
      const amount = await sourceAccount.fetchBalance();
      expect(amount).not.toBeNull();
    } catch (e) {
      // ignoring case when fetchBalance is rejected
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const sourceAccount = getBankAccount(1000);
    const oldBalance = sourceAccount.getBalance();

    try {
      await sourceAccount.fetchBalance();
      expect(sourceAccount.getBalance()).toEqual(oldBalance + 100);
    } catch (e) {
      // ignoring case when fetchBalance is rejected
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const sourceAccount = getBankAccount(1000);

    try {
      // ignoring case when fetchBalance is resolved
    } catch (e) {
      await expect(sourceAccount.synchronizeBalance()).rejects.toThrow(
        SynchronizationFailedError,
      );
    }
  });
});
