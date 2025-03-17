import { render, screen, fireEvent } from '@testing-library/react';
import { CuisineFilter } from '../cuisine-filter';

const mockCuisines = [
  { Name: 'Italian', SeoName: 'italian', Total: 5 },
  { Name: 'Chinese', SeoName: 'chinese', Total: 3 },
  { Name: 'Indian', SeoName: 'indian', Total: 4 }
];

describe('CuisineFilter', () => {
  it('renders all cuisine options', () => {
    render(
      <CuisineFilter
        cuisines={mockCuisines}
        selectedCuisines={[]}
        onCuisineChange={() => {}}
        onClearFilters={() => {}}
      />
    );

    // Update selectors to match actual component structure
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('(5)')).toBeInTheDocument();
    expect(screen.getByText('Chinese')).toBeInTheDocument();
    expect(screen.getByText('(3)')).toBeInTheDocument();
  });

  it('shows selected cuisines correctly', () => {
    render(
      <CuisineFilter
        cuisines={mockCuisines}
        selectedCuisines={['italian']}
        onCuisineChange={() => {}}
        onClearFilters={() => {}}
      />
    );

    // Look for the selection summary text by test ID
    const selectionSummaryText = screen.getByTestId('cuisine-selection-text');
    expect(selectionSummaryText).toHaveTextContent('cuisine selected');

    // Check count badge
    expect(screen.getByText('1')).toBeInTheDocument();

    // Check selected cuisine using test ID
    const selectedCuisine = screen.getByTestId('cuisine-name-italian');
    expect(selectedCuisine).toHaveTextContent('Italian');

    // Check selected cuisine styling
    const italianButton = screen.getByRole('checkbox', { name: /italian/i });
    expect(italianButton).toHaveClass('bg-primary-50');
  });

  it('filters cuisines based on search input', () => {
    render(
      <CuisineFilter
        cuisines={mockCuisines}
        selectedCuisines={[]}
        onCuisineChange={() => {}}
        onClearFilters={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/search cuisines/i), {
      target: { value: 'ind' }
    });

    expect(screen.getByText('Indian')).toBeInTheDocument();
    expect(screen.getByText('(4)')).toBeInTheDocument();
    expect(screen.queryByText('Italian')).not.toBeInTheDocument();
  });
});
