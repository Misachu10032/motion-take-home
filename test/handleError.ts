import { handleError, ErrorMessage } from '../src/handleError';
import { exponentialBackoff } from '../src/utils/exponentialBackoffHelper';

// Mocking the axios error
const createAxiosError = (code: number): unknown => ({
  response: {
    data: {
      error: {
        code,
      },
    },
  },
});

// Mocking the exponentialBackoff function
jest.mock('../src/utils/exponentialBackoffHelper', () => ({
  exponentialBackoff: jest.fn(),
}));

describe('handleError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle rate limit error and implement exponential backoff', async () => {
    const axiosError = createAxiosError(4);

    (exponentialBackoff as jest.Mock).mockResolvedValueOnce((() => Promise.resolve()));

    const result = await handleError(axiosError, 1);

    expect(result).toBe(ErrorMessage.rateLimitErrorMessage);

    expect(exponentialBackoff).toHaveBeenCalledWith(1);
  });

  it('should handle authentication error', async () => {
    const axiosError = createAxiosError(190);

    const result = await handleError(axiosError, 1);

    expect(result).toBe(ErrorMessage.authErrorMessage);

    expect(exponentialBackoff).not.toHaveBeenCalled(); // Should not call exponentialBackoff for auth error
  });

  it('should handle other errors', async () => {
    const axiosError = createAxiosError(500); // Some other error code

    const result = await handleError(axiosError, 1);

    expect(result).toBe(ErrorMessage.otherErrorMessage);

    expect(exponentialBackoff).not.toHaveBeenCalled(); // Should not call exponentialBackoff for other errors
  });
});
