import React from 'react';
import Sticky from 'react-stickynode';
import ArrayList from '../../models/Array';
import BlogContents from './BlogContents';
import SearchInput from './SearchInput';
import style from './BlogSideContents.module.scss';
import Blog from '../../models/Blog';
import BlogCategoryList from './BlogCategoryList';
import Category from '../../models/Category';
import BlogProfile from './BlogProfile';
import useMedia from '../../hooks/useMedia';

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
  const isPC = useMedia('pc');

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
          <Sticky innerZ={1} top={90} enabled={isPC}>
            <BlogProfile />
          </Sticky>
        </div>
      </aside>
      <aside className={style.sideBlogContentsFlow}>
        {contents && (
          <div className={style.contentsWrapper}>
            <Sticky innerZ={1} top={375} enabled={isPC}>
              <BlogContents contents={contents} />
            </Sticky>
          </div>
        )}
      </aside>
    </>
  );
};

export default BlogSideContents;
