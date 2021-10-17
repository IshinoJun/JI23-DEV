import { useContext } from 'react';
import { SearchContext, SearchContextValue } from '../context';

export const useSearch = (): SearchContextValue => {
  const { search, setSearch } = useContext(SearchContext);

  return { search, setSearch };
};
