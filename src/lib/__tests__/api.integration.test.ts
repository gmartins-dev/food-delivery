import { getRestaurantsByOutcode } from '../api'

describe('Restaurant API Integration', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch restaurants for valid outcode', async () => {
    const mockResponse = {
      Area: 'EC4M',
      Restaurants: [
        {
          Id: 1,
          Name: 'Test Restaurant',
          Rating: { StarRating: 4.5, Count: 100 },
          Cuisines: [{ Id: '1', Name: 'Italian' }],
          LogoUrl: 'test.jpg',
          IsOpenNow: true
        }
      ]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await getRestaurantsByOutcode('ec4m');

    expect(result).toHaveProperty('restaurants');
    expect(Array.isArray(result.restaurants)).toBe(true);
    expect(result.restaurants[0]).toHaveProperty('name', 'Test Restaurant');
  });

  it('should handle API errors gracefully', async () => {
    const networkError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

    await expect(getRestaurantsByOutcode('invalid'))
      .rejects
      .toThrow('Network error');
  });

  it('should handle 404 responses', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({ message: 'Not Found' })
    });

    await expect(getRestaurantsByOutcode('invalid'))
      .rejects
      .toThrow('Failed to fetch restaurants: HTTP error! status: 404');
  });

  it('should handle rate limiting (429)', async () => {
    const mockResponse = {
      Area: 'EC4M',
      Restaurants: [{
        Id: 1,
        Name: 'Test Restaurant',
        Rating: { StarRating: 4.5, Count: 100 },
        Cuisines: [{ Id: '1', Name: 'Italian', SeoName: 'italian' }],
        LogoUrl: 'test.jpg',
        IsOpenNow: true
      }]
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: { get: () => '1' },
        url: '/api/restaurants?outcode=ec4m'
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

    const result = await getRestaurantsByOutcode('ec4m');
    expect(result.restaurants).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should transform cuisine details correctly', async () => {
    const mockResponse = {
      Area: 'EC4M',
      Restaurants: [
        {
          Id: 1,
          Name: 'Restaurant 1',
          Cuisines: [{ Id: '1', Name: 'Italian', SeoName: 'italian' }]
        },
        {
          Id: 2,
          Name: 'Restaurant 2',
          Cuisines: [
            { Id: '1', Name: 'Italian', SeoName: 'italian' },
            { Id: '2', Name: 'Pizza', SeoName: 'pizza' }
          ]
        }
      ]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      status: 200
    });

    const result = await getRestaurantsByOutcode('ec4m');
    expect(result.CuisineDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ Name: 'Italian', SeoName: 'italian', Total: 2 }),
        expect.objectContaining({ Name: 'Pizza', SeoName: 'pizza', Total: 1 })
      ])
    );
  });
});
