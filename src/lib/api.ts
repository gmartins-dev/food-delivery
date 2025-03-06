// Types
export interface Restaurant {
  id: string;
  name: string;
  rating: {
    starRating: number;
    count: number;
  };
  cuisines: Array<{
    id: string;
    name: string;
  }>;
  logoUrl: string;
  isOpenNow: boolean;
  deliveryEtaMinutes?: {
    rangeLower: number;
    rangeUpper: number;
  };
  address?: {
    firstLine?: string;
    city?: string;
    postalCode?: string;
  };
}

export interface SearchResponse {
  restaurants: Restaurant[];
  filterGroups?: Array<{
    name: string;
    filters: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

// Mock data for development when API is unavailable
const MOCK_DATA: SearchResponse = {
  restaurants: [
    {
      id: "1",
      name: "Pizza Place",
      rating: { starRating: 4.5, count: 123 },
      cuisines: [
        { id: "1", name: "Pizza" },
        { id: "2", name: "Italian" }
      ],
      logoUrl: "/restaurant-placeholder.jpg",
      isOpenNow: true,
      deliveryEtaMinutes: { rangeLower: 25, rangeUpper: 40 }
    },
    {
      id: "2",
      name: "Burger Joint",
      rating: { starRating: 4.2, count: 89 },
      cuisines: [
        { id: "3", name: "American" },
        { id: "4", name: "Burgers" }
      ],
      logoUrl: "/restaurant-placeholder.jpg",
      isOpenNow: true,
      deliveryEtaMinutes: { rangeLower: 15, rangeUpper: 30 }
    },
    {
      id: "3",
      name: "Sushi World",
      rating: { starRating: 4.8, count: 240 },
      cuisines: [
        { id: "5", name: "Japanese" },
        { id: "6", name: "Sushi" }
      ],
      logoUrl: "/restaurant-placeholder.jpg",
      isOpenNow: true,
      deliveryEtaMinutes: { rangeLower: 30, rangeUpper: 45 }
    }
  ]
};

// API base URL
const API_BASE_URL = "https://uk.api.just-eat.io";

// Helper function to handle rate limiting with exponential backoff
const fetchWithRateLimitRetry = async (url: string, options: RequestInit = {}, retries = 3, backoff = 1000) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // Handle rate limiting (429 status code)
    if (response.status === 429 && retries > 0) {
      // Get retry-after header or use default backoff
      const retryAfter = response.headers.get("retry-after");
      const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : backoff;

      console.log(`Rate limited. Retrying after ${waitTime}ms`);

      // Wait for the backoff period
      await new Promise(resolve => setTimeout(resolve, waitTime));

      // Retry with exponential backoff
      return fetchWithRateLimitRetry(url, options, retries - 1, backoff * 2);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (retries > 0) {
      console.log(`Fetch error, retrying... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRateLimitRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
};

export const getRestaurantsByOutcode = async (outcode: string): Promise<SearchResponse> => {
  try {
    // For development, if you're having issues with the API connection,
    // use mock data
    return Promise.resolve(MOCK_DATA);

    // When ready to use the actual API, uncomment the line below and comment out the mock data line above
    // return await fetchWithRateLimitRetry(`${API_BASE_URL}/restaurants/bypostcode/${outcode}`);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
