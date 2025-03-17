import { render, screen, fireEvent } from '@testing-library/react';
import { RestaurantCard } from '../restaurant-card';

const mockRestaurant = {
  id: '123',
  name: 'Test Restaurant',
  rating: { starRating: 4.5, count: 100 },
  cuisines: [
    { Name: 'Italian', SeoName: 'italian' },
    { Name: 'Pizza', SeoName: 'pizza' }
  ],
  logoUrl: 'https://example.com/test-logo.jpg', // Updated to absolute URL
  isOpenNow: true,
  deliveryEtaMinutes: { rangeLower: 20, rangeUpper: 30 },
  address: { firstLine: '123 Test St', city: 'London' }
};

// Mock food images
jest.mock('@/lib/food-images', () => ({
  getFoodImageForRestaurant: () => 'https://example.com/food-image.jpg',
  getFoodImageForCuisine: () => 'https://example.com/cuisine-image.jpg'
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

describe('RestaurantCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders restaurant information correctly', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);

    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText(/20-30 min/i)).toBeInTheDocument();
  });

  it('shows closed overlay when restaurant is closed', () => {
    render(
      <RestaurantCard
        restaurant={{ ...mockRestaurant, isOpenNow: false }}
      />
    );

    expect(screen.getByText('Currently Closed')).toBeInTheDocument();
  });

  it('triggers cuisine filter when clicking cuisine badge', () => {
    const onCuisineClick = jest.fn();
    render(
      <RestaurantCard
        restaurant={mockRestaurant}
        onCuisineClick={onCuisineClick}
      />
    );

    fireEvent.click(screen.getByText('Italian'));
    expect(onCuisineClick).toHaveBeenCalledWith('italian');
  });
});
