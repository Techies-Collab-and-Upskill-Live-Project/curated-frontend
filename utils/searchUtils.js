// utils/searchUtils.ts
export const getSearchHistory = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  }
  return [];
};

export const addToSearchHistory = (term) => {
  if (typeof window !== 'undefined') {
    const history = getSearchHistory();
    const updated = [term, ...history.filter(t => t !== term)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }
};
