import React from 'react';
import ArrayList from '../../models/Array';
import Tag from '../../models/Tag';
import BlogContents from './BlogContents';
import BlogTagList from './BlogTagList';
import SearchInput from './SearchInput';
import style from './BlogSideContents.module.scss';

interface Props {
  tags: ArrayList<Tag>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onClickSearchButton: () => void;
  onKeyDownSearch: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  contents?: HTMLHeadingElement[];
}

const BlogSideContents: React.FC<Props> = (props) => {
  const {
    keyword,
    setKeyword,
    onClickSearchButton,
    onKeyDownSearch,
    tags,
    contents,
  } = props;

  return (
    <>
      <div className={style.searchInputWrapper}>
        <SearchInput
          keyword={keyword}
          setKeyword={setKeyword}
          onClickSearchButton={onClickSearchButton}
          onKeyDownSearch={onKeyDownSearch}
        />
      </div>
      <div className={style.tagsWrapper}>
        <BlogTagList tags={tags} />
      </div>
      {contents && (
        <div className={style.contentsWrapper}>
          <BlogContents contents={contents} />
        </div>
      )}
    </>
  );
};

export default BlogSideContents;
