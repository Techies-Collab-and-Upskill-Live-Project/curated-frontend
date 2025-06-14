import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from '@/components/Searchbar'; 
import { IconSearch } from '@tabler/icons-react';

jest.mock('@tabler/icons-react', () => ({
  IconSearch: jest.fn(() => <svg data-testid="search-icon" />),
}));

describe('Searchbar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<Searchbar onSearch={mockOnSearch} />);
  });

  it('renders the search form with all elements', () => {
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search/Playlist Link...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('updates the query state when typing', () => {
    const input = screen.getByPlaceholderText('Search/Playlist Link...');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });

  it('calls onSearch with the query when form is submitted', () => {
    const input = screen.getByPlaceholderText('Search/Playlist Link...');
    const form = screen.getByTestId('search-form');

    fireEvent.change(input, { target: { value: 'react testing' } });
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('react testing');
  });

  it('prevents default form submission behavior', () => {
    const form = screen.getByTestId('search-form');
    const preventDefault = jest.fn();
    const submitEvent = new Event('submit', { bubbles: true });
    submitEvent.preventDefault = preventDefault;
    
    fireEvent(form, submitEvent);
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it('requires the input field to be filled', () => {
    const input = screen.getByPlaceholderText('Search/Playlist Link...');
    expect(input).toBeRequired();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Searchbar onSearch={mockOnSearch} />);
    expect(asFragment()).toMatchSnapshot();
  });
});