import Image from 'next/image';
import * as React from 'react';
import Highlight from 'react-highlight';
import Blog from '../../models/Blog';
import style from './Blog.module.scss';
import Tags from './Tags';
import TwitterShareButton from './TwitterShareButton';
import ArrayList from '../../models/Array';
import BlogDate from './BlogDate';
import BlogLink from './BlogLink';

interface Props {
  blog: Blog;
  blogs: ArrayList<Blog>;
}

const BlogComponent: React.FC<Props> = (props: Props) => {
  const { blog, blogs } = props;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const blogIndex = blogs.contents.map((c) => c.id).indexOf(blog?.id ?? '');
  const nextBlog = blogs.contents[blogIndex - 1];
  const prevBlog = blogs.contents[blogIndex + 1];

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
            <Highlight innerHTML className="markdown-body">
              {blog.content}
            </Highlight>
          </div>
          <div className={style.shareArea}>
            <TwitterShareButton
              url={`${baseUrl}/blogs/${blog.id}`}
              text={blog.introduction}
            />
          </div>
          <div className={style.linkArea}>
            <BlogLink prevBlog={prevBlog} nextBlog={nextBlog} />
          </div>
        </main>
      )}
    </>
  );
};

export default BlogComponent;
