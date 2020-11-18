import Image from 'next/image';
import * as React from 'react';
import Highlight from 'react-highlight';
import Blog from '../../models/Blog';
import style from './Blog.module.scss';
import Tags from './Tags';
import BlogDate from './BlogDate';

interface Props {
  blog: Blog;
}

const BlogComponent: React.FC<Props> = (props: Props) => {
  const { blog } = props;

  return (
    <>
      {blog.id && (
        <main className={style.contact}>
          <div className={style.blog}>
            <Image
              src={`/ogp/${blog.id}.png`}
              alt="ブログ画像"
              width={900}
              height={472.5}
            />
            <div className={style.entryHeader}>
              <BlogDate blog={blog} />
              <h1>{blog.title}</h1>
              <Tags tags={blog.tags} tagsPosition="left" />
            </div>
            <Highlight innerHTML className={['markdown-body'].join(' ')}>
              {blog.content}
            </Highlight>
          </div>
        </main>
      )}
    </>
  );
};

export default BlogComponent;
