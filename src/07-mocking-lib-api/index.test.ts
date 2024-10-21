// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi('/posts');

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const response = await throttledGetDataFromApi('/posts');

    expect(response).toEqual('mocked data');
  });
});
