import React, { useCallback } from 'react';
import { IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import style from './SearchInput.module.scss';

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onClickSearchButton: () => void;
  onKeyDownSearch: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}
const SearchInput: React.FC<Props> = (props: Props) => {
  const { keyword, setKeyword, onClickSearchButton, onKeyDownSearch } = props;

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      setKeyword(value);
    },
    [setKeyword],
  );

  return (
    <div className={style.search}>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        className={style.searchInput}
        value={keyword}
        onChange={handleChangeKeyword}
        onKeyDown={onKeyDownSearch}
      />
      <IconButton
        className={style.searchIcon}
        onClick={onClickSearchButton}
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchInput;
