import { searchTracks, ITUNES_BASE_URL, itunesApi } from '../itunesApi';

describe('itunesApi', () => {
  it('should be initialized with correct base URL', () => {
    expect(itunesApi.getBaseURL()).toBe(ITUNES_BASE_URL);
  });

  describe('searchTracks', () => {
    const mockGet = jest.fn();
    const originalGet = itunesApi.get;

    beforeEach(() => {
      itunesApi.get = mockGet;
    });

    afterEach(() => {
      itunesApi.get = originalGet;
      jest.clearAllMocks();
    });

    it('should call the correct endpoint with encoded query', () => {
      const query = 'test search';
      searchTracks(query);
      expect(mockGet).toHaveBeenCalledWith(
        `/search?term=${encodeURIComponent(query)}&entity=song&limit=20`
      );
    });

    it('should handle special characters in search query', () => {
      const query = 'rock & roll';
      searchTracks(query);
      expect(mockGet).toHaveBeenCalledWith(
        `/search?term=${encodeURIComponent(query)}&entity=song&limit=20`
      );
    });
  });
});
