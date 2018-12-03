const serviceFactory = require('../service');

const getRepositoryMock = () => ({
  getAccounts: jest.fn().mockResolvedValue([]),
});

describe('accountService', () => {
  describe('getAccounts()', () => {
    it('returns accounts list', async () => {
      const service = serviceFactory({
        accountRepository: getRepositoryMock(),
      });

      const testUser = {
        type: 'ADMIN',
      };

      await expect(service.getAccounts(testUser)).resolves.toEqual([]);
    });

    it('throws if user is not admin', async () => {
      const service = serviceFactory({
        accountRepository: getRepositoryMock(),
      });

      const testUser = {
        type: 'USER',
      };

      await expect(service.getAccounts(testUser)).rejects.toThrowError(
        'Only admins can list accounts'
      );
    });
  });
});
