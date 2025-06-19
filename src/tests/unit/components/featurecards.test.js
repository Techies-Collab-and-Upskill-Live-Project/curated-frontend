import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeatureCards from '@/components/FeatureCards';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock window.matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('FeatureCards Component', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders both mobile and desktop layouts (both present in DOM)', () => {
    render(<FeatureCards />);
    
    // Both containers should be in the DOM
    expect(screen.getByTestId('mobile-container')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-container')).toBeInTheDocument();
    
    // All cards should be present
    expect(screen.getByTestId('mobile-card-smart-search')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-card-curated-paths')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-card-save-and-watch-later')).toBeInTheDocument();
    
    expect(screen.getByTestId('desktop-card-smart-search')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-card-curated-paths')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-card-save-and-watch-later')).toBeInTheDocument();
  });

  it('mobile container has correct responsive classes', () => {
    render(<FeatureCards />);
    const mobileContainer = screen.getByTestId('mobile-container');
    expect(mobileContainer).toHaveClass('md:hidden');
  });

  it('desktop container has correct responsive classes', () => {
    render(<FeatureCards />);
    const desktopContainer = screen.getByTestId('desktop-container');
    expect(desktopContainer).toHaveClass('hidden', 'md:grid');
  });

  it('mobile cards have correct styling classes', () => {
    render(<FeatureCards />);
    const mobileCard = screen.getByTestId('mobile-card-smart-search');
    expect(mobileCard).toHaveClass('hover:bg-gray-50');
  });

  it('desktop cards have correct styling classes', () => {
    render(<FeatureCards />);
    const desktopCard = screen.getByTestId('desktop-card-smart-search');
    expect(desktopCard).toHaveClass('hover:shadow-lg');
  });

  it('mobile cards have correct href attributes', () => {
    render(<FeatureCards />);
    
    const mobileCard = screen.getByTestId('mobile-card-smart-search');
    expect(mobileCard).toHaveAttribute('href', '#');
    
    const curatedPathsCard = screen.getByTestId('mobile-card-curated-paths');
    expect(curatedPathsCard).toHaveAttribute('href', '#');
    
    const saveCard = screen.getByTestId('mobile-card-save-and-watch-later');
    expect(saveCard).toHaveAttribute('href', '#');
  });

  it('desktop cards have correct href attributes', () => {
    render(<FeatureCards />);
    
    const desktopCard = screen.getByTestId('desktop-card-smart-search');
    expect(desktopCard).toHaveAttribute('href', '#');
    
    const curatedPathsCard = screen.getByTestId('desktop-card-curated-paths');
    expect(curatedPathsCard).toHaveAttribute('href', '#');
    
    const saveCard = screen.getByTestId('desktop-card-save-and-watch-later');
    expect(saveCard).toHaveAttribute('href', '#');
  });

  it('renders all topics correctly', () => {
    render(<FeatureCards />);
    
    // Check that all topic titles are rendered
    expect(screen.getAllByText('Smart Search')).toHaveLength(2); // Mobile + Desktop
    expect(screen.getAllByText('Curated Paths')).toHaveLength(2);
    expect(screen.getAllByText('Save and Watch later')).toHaveLength(2);
  });

  it('renders images with correct alt text', () => {
    render(<FeatureCards />);
    
    // Check alt text for images (should have 2 of each - mobile and desktop)
    expect(screen.getAllByAltText('Smart Search')).toHaveLength(2);
    expect(screen.getAllByAltText('Curated Paths')).toHaveLength(2);
    expect(screen.getAllByAltText('Save and Watch later')).toHaveLength(2);
  });

  it('has correct link hrefs', () => {
    render(<FeatureCards />);
    
    const smartSearchLinks = screen.getAllByRole('link', { name: /smart search/i });
    smartSearchLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#');
    });
  });
});