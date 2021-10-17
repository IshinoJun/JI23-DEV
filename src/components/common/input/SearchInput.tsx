import { IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useSearch } from '../../../hooks';
import style from './SearchInput.module.scss';

export const SearchInput: React.FC = () => {
  const { search, setSearch } = useSearch();
  const router = useRouter();

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      setSearch(value);
    },
    [setSearch],
  );

  const handleClickSearchButton = useCallback(() => {
    void router.push(`/blogs/search/?keyword=${search}`);
  }, [search, router]);

  const handleKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        void router.push(`/blogs/search/?keyword=${search}`);
      }
    },
    [search, router],
  );

  return (
    <div className={style.search}>
      <InputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        className={style.searchInput}
        value={search}
        onChange={handleChangeKeyword}
        onKeyDown={handleKeyDownSearch}
      />
      <IconButton
        className={style.searchIcon}
        onClick={handleClickSearchButton}
        aria-label='Search'
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};
