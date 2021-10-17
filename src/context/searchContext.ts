import { createContext } from 'react';

export interface SearchContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextValue>({
  search: '',
  setSearch: () => undefined,
});
