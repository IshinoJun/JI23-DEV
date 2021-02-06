import React, { useRef } from 'react';
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
  const divEl = useRef<HTMLDivElement>(null);

  const {
    categories,
    keyword,
    setKeyword,
    onClickSearchButton,
    onKeyDownSearch,
    contents,
  } = props;

  return (
    <div ref={divEl} className={style.content}>
      <aside>
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
      <Sticky
        innerZ={1}
        top={60}
        enabled={isPC}
        bottomBoundary={divEl.current?.clientHeight}
      >
        <aside className={style.wrapper}>
          <BlogProfile />
        </aside>
        {contents && (
          <aside className={style.wrapper}>
            <BlogContents contents={contents} />
          </aside>
        )}
      </Sticky>
    </div>
  );
};

export default BlogSideContents;
