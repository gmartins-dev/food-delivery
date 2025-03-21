export interface CuisineType {
  Name: string;
  SeoName: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: {
    starRating: number;
    count: number;
  };
  cuisines: CuisineType[];
  CuisineTypes: CuisineType[];
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

export interface CuisineDetail {
  Name: string;
  SeoName: string;
  Total: number;
}

export interface SearchResponse {
  restaurants: Restaurant[];
  CuisineDetails: CuisineDetail[];
  filterGroups?: Array<{
    name: string;
    filters: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

export interface JustEatRestaurant {
  Id: number;
  Name: string;
  Rating: {
    StarRating: number;
    Count: number;
  };
  Cuisines: Array<{
    Id: string;
    Name: string;
  }>;
  LogoUrl: string;
  IsOpenNow: boolean;
  DeliveryEtaMinutes?: {
    RangeLower: number;
    RangeUpper: number;
  };
  Address?: {
    FirstLine?: string;
    City?: string;
    Postcode?: string;
  };
}

export interface JustEatResponse {
  Area: string;
  Restaurants: JustEatRestaurant[];
  // ...other fields we don't need
}

// Transform JustEat response to our format
function transformResponse(response: JustEatResponse): SearchResponse {
  // Create a map to count cuisine occurrences
  const cuisineCount = new Map<string, { name: string; count: number }>();

  // Count cuisines across all restaurants
  response.Restaurants.forEach(restaurant => {
    restaurant.Cuisines.forEach(cuisine => {
      const seoName = cuisine.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (!cuisineCount.has(seoName)) {
        cuisineCount.set(seoName, { name: cuisine.Name, count: 1 });
      } else {
        const current = cuisineCount.get(seoName)!;
        cuisineCount.set(seoName, { ...current, count: current.count + 1 });
      }
    });
  });

  // Transform to CuisineDetails array
  const cuisineDetails = Array.from(cuisineCount.entries()).map(([seoName, data]) => ({
    Name: data.name,
    SeoName: seoName,
    Total: data.count
  }));

  return {
    restaurants: (response.Restaurants || []).map(r => ({
      id: r.Id.toString(),
      name: r.Name,
      rating: {
        starRating: r.Rating?.StarRating || 0,
        count: r.Rating?.Count || 0
      },
      cuisines: (r.Cuisines || []).map(c => ({
        Name: c.Name,
        SeoName: c.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      })),
      CuisineTypes: (r.Cuisines || []).map(c => ({
        Name: c.Name,
        SeoName: c.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      })),
      logoUrl: r.LogoUrl,
      isOpenNow: r.IsOpenNow,
      deliveryEtaMinutes: r.DeliveryEtaMinutes ? {
        rangeLower: r.DeliveryEtaMinutes.RangeLower,
        rangeUpper: r.DeliveryEtaMinutes.RangeUpper
      } : undefined,
      address: r.Address ? {
        firstLine: r.Address.FirstLine,
        city: r.Address.City,
        postalCode: r.Address.Postcode
      } : undefined
    })),
    CuisineDetails: cuisineDetails
  };
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleRateLimitResponse = async (response: Response): Promise<Response> => {
  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After') || '1', 10);
    await wait(retryAfter * 1000);
    return fetch(response.url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return response;
};

export async function getRestaurantsByOutcode(outcode: string): Promise<SearchResponse> {
  try {
    let response = await fetch(`/api/restaurants?outcode=${outcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 429) {
      response = await handleRateLimitResponse(response);
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: HTTP error! status: ${response.status}`);
    }

    const data: JustEatResponse = await response.json();
    return transformResponse(data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}
