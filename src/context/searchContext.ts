import { createContext } from 'react';

interface SearchContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextValue>({
  search: '',
  setSearch: () => undefined,
});

export default SearchContext;
