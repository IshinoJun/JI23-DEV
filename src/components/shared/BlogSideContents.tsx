import React from 'react';
import ArrayList from '../../models/Array';
import BlogContents from './BlogContents';
import SearchInput from './SearchInput';
import style from './BlogSideContents.module.scss';
import Blog from '../../models/Blog';
import BlogCategoryList from './BlogCategoryList';
import Category from '../../models/Category';
import BlogProfile from './BlogProfile';

interface Props {
  categories: ArrayList<Category>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onClickSearchButton: () => void;
  onKeyDownSearch: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  contents?: HTMLHeadingElement[];
  blog?: Blog;
}

const BlogSideContents: React.FC<Props> = (props) => {
  const {
    categories,
    keyword,
    setKeyword,
    onClickSearchButton,
    onKeyDownSearch,
    contents,
  } = props;

  return (
    <>
      <aside className={style.wrapper}>
        <SearchInput
          keyword={keyword}
          setKeyword={setKeyword}
          onClickSearchButton={onClickSearchButton}
          onKeyDownSearch={onKeyDownSearch}
        />
      </aside>
      <aside className={style.wrapper}>
        <BlogCategoryList categories={categories} />
      </aside>
      <aside className={style.sideFlow}>
        <div className={style.contentsWrapper}>
          <BlogProfile />
        </div>
      </aside>
      <aside className={style.sideBlogContentsFlow}>
        {contents && (
          <div className={style.contentsWrapper}>
            <BlogContents contents={contents} />
          </div>
        )}
      </aside>
    </>
  );
};

export default BlogSideContents;
