import React from 'react';
import ArrayList from '../../models/Array';
import BlogContents from './BlogContents';
import SearchInput from './SearchInput';
import style from './BlogSideContents.module.scss';
import Blog from '../../models/Blog';
import BlogCategoryList from './BlogCategoryList';
import Category from '../../models/Category';
import BlogTopArticleList from './BlogTopArticleList';
import BlogNewList from './BlogNewList';

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
  topArticleBlogs: Blog[];
  newBlogs: Blog[];
}

const BlogSideContents: React.FC<Props> = (props) => {
  const {
    categories,
    keyword,
    setKeyword,
    onClickSearchButton,
    onKeyDownSearch,
    contents,
    topArticleBlogs,
    newBlogs,
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
      <aside className={style.wrapper}>
        <BlogTopArticleList blogs={topArticleBlogs} />
      </aside>
      <aside className={style.wrapper}>
        <BlogNewList blogs={newBlogs} />
      </aside>
      <aside className={style.sideFlow}>
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
