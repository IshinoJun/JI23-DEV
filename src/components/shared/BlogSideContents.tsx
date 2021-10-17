import React, { useRef } from 'react';
import Sticky from 'react-stickynode';
import { useMedia } from '../../hooks';
import { Blog, Category, List } from '../../models';
import BlogCategoryList from './BlogCategoryList';
import BlogContents from './BlogContents';
import BlogProfile from './BlogProfile';
import style from './BlogSideContents.module.scss';
import SearchInput from './SearchInput';

interface Props {
  categories: List<Category>;
  contents?: HTMLHeadingElement[];
  blog?: Blog;
}

const BlogSideContents: React.FC<Props> = (props) => {
  const isPC = useMedia('pc');
  const divEl = useRef<HTMLDivElement>(null);

  const { categories, contents } = props;

  return (
    <div ref={divEl} className={style.content}>
      <aside>
        <SearchInput />
      </aside>
      <aside>
        <BlogCategoryList categories={categories} />
      </aside>
      <Sticky
        innerZ={1}
        top={90}
        enabled={isPC}
        bottomBoundary={divEl.current?.clientHeight}
      >
        <aside>
          <BlogProfile />
        </aside>
        {contents && (
          <aside>
            <BlogContents contents={contents} />
          </aside>
        )}
      </Sticky>
    </div>
  );
};

export default BlogSideContents;
