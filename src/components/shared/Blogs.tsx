import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@material-ui/core';
import ArrayList from '../../models/Array';
import Blog from '../../models/Blog';
import style from './Blogs.module.scss';
import Tags from './Tags';
import BlogDate from './BlogDate';

interface Props {
  blogs: ArrayList<Blog>;
}

const Blogs: React.FC<Props> = (props: Props) => {
  const { blogs } = props;

  return (
    <main>
      {blogs.contents.map(
        (blog) =>
          blog.id && (
            <div key={blog.id} className={style.content}>
              <div className={style.blog}>
                <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                  <a>
                    <Image
                      src={`/ogp/${blog.id}.png`}
                      alt="ブログ画像"
                      width={900}
                      height={472.5}
                    />
                  </a>
                </Link>
                <BlogDate blog={blog} />
                <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                  <a>
                    <h2>{blog.title}</h2>
                  </a>
                </Link>
                <Tags tags={blog.tags} tagsPosition="left" />
                <Button
                  style={{ marginTop: 20 }}
                  type="button"
                  variant="contained"
                  className={style.read}
                  aria-label="記事を読む"
                >
                  <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                    <a>記事を読む</a>
                  </Link>
                </Button>
              </div>
            </div>
          ),
      )}
    </main>
  );
};

export default Blogs;
