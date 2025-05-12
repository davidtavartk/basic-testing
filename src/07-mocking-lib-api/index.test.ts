// Uncomment the code below and write your tests
// /* import axios from 'axios';
// import { throttledGetDataFromApi } from './index'; */

import { throttledGetDataFromApi } from '07-mocking-lib-api';
import axios from 'axios';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });

    (axios.create as jest.Mock) = mockCreate;

    await throttledGetDataFromApi('/test');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    const relativePath = '/users';
    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const expectedData = { id: 1, name: 'Test User' };

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: expectedData }),
    });

    const result = await throttledGetDataFromApi('/users/1');

    expect(result).toEqual(expectedData);
  });
});
