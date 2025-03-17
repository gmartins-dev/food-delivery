import { render, screen, fireEvent } from '@testing-library/react'
import { SearchForm } from '../search-form'

describe('SearchForm', () => {
  it('renders correctly', () => {
    render(<SearchForm onSearch={() => {}} />)

    expect(screen.getByPlaceholderText(/enter outcode/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  });

  it('validates outcode format', async () => {
    const mockSearch = jest.fn()
    render(<SearchForm onSearch={mockSearch} />)

    const input = screen.getByPlaceholderText(/enter outcode/i)

    // Test invalid outcode
    fireEvent.change(input, { target: { value: '@' } })
    fireEvent.submit(input.closest('form')!)

    // Update to match the actual error message from the component
    expect(screen.getByText(/outcode must be at least 2 characters/i)).toBeInTheDocument()
    expect(mockSearch).not.toHaveBeenCalled()

    // Test valid outcode
    fireEvent.change(input, { target: { value: 'ec4m' } })
    fireEvent.submit(input.closest('form')!)

    expect(mockSearch).toHaveBeenCalledWith('ec4m')
  });

  it('shows error for special characters', async () => {
    const mockSearch = jest.fn();
    render(<SearchForm onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/enter outcode/i);
    fireEvent.change(input, { target: { value: 'ec4@' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText(/must contain only letters and numbers/i)).toBeInTheDocument();
    expect(mockSearch).not.toHaveBeenCalled();
  });
});
