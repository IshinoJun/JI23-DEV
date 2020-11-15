import React from 'react';
import ArrayList from '../../models/Array';
import Tag from '../../models/Tag';
import BlogContents from './BlogContents';
import BlogTagList from './BlogTagList';
import SearchInput from './SearchInput';
import style from './BlogSideContents.module.scss';
import TwitterShareButton from './TwitterShareButton';
import Blog from '../../models/Blog';

interface Props {
  tags: ArrayList<Tag>;
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
    keyword,
    setKeyword,
    onClickSearchButton,
    onKeyDownSearch,
    tags,
    contents,
    blog,
  } = props;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

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
      <div className={style.sideFlow}>
        {contents && (
          <div className={style.contentsWrapper}>
            <BlogContents contents={contents} />
          </div>
        )}
        {blog && blog.id && (
          <div className={style.shareArea}>
            <TwitterShareButton
              url={`${baseUrl}/blogs/${blog.id}`}
              text={blog.title}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogSideContents;
