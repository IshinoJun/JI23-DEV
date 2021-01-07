import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import ArrayList from '../../models/Array';
import Tag from '../../models/Tag';
import BlogContents from './BlogContents';
import BlogTagList from './BlogTagList';
import SearchInput from './SearchInput';
import style from './BlogSideContents.module.scss';
import Blog from '../../models/Blog';
import BlogCategoryList from './BlogCategoryList';
import Category from '../../models/Category';
import BlogTopArticleList from './BlogTopArticleList';
import BlogNewList from './BlogNewList';

interface Props {
  categories: ArrayList<Category>;
  tags: ArrayList<Tag>;
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
    tags,
    contents,
    blog,
    topArticleBlogs,
    newBlogs,
  } = props;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

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
        <BlogTagList tags={tags} />
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
        {blog && blog.id && (
          <div className={style.shareArea}>
            <TwitterShareButton
              url={`${baseUrl}/blogs/${blog.id}`}
              title={blog.title}
            >
              <TwitterIcon round size={45} />
            </TwitterShareButton>
            <FacebookShareButton
              url={`${baseUrl}/blogs/${blog.id}`}
              title={blog.title}
            >
              <FacebookIcon round size={45} />
            </FacebookShareButton>
            <HatenaShareButton
              url={`${baseUrl}/blogs/${blog.id}`}
              title={blog.title}
            >
              <HatenaIcon round size={45} />
            </HatenaShareButton>
          </div>
        )}
      </aside>
    </>
  );
};

export default BlogSideContents;
