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
  return {
    restaurants: (response.Restaurants || []).map(r => ({
      id: r.Id.toString(),
      name: r.Name,
      rating: {
        starRating: r.Rating?.StarRating || 0,
        count: r.Rating?.Count || 0
      },
      cuisines: (r.Cuisines || []).map(c => ({
        id: c.Id,
        name: c.Name
      })),
      logoUrl: r.LogoUrl,
      isOpenNow: r.IsOpenNow,
      deliveryEtaMinutes: r.DeliveryEtaMinutes,
      address: r.Address
    }))
  };
}

export async function getRestaurantsByOutcode(outcode: string): Promise<SearchResponse> {
  try {
    const response = await fetch(`/api/restaurants?outcode=${outcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }

    const data: JustEatResponse = await response.json();
    return transformResponse(data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}
