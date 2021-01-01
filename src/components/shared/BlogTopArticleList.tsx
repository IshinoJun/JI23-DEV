import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import ArrayList from '../../models/Array';
import Blog from '../../models/Blog';
import style from './BlogTopArticleList.module.scss';

interface Props {
  blogs: ArrayList<Blog>;
}

const BlogTopArticleList: React.FC<Props> = (props) => {
  const { blogs } = props;

  return (
    <aside>
      <h1 className={style.title}>人気の記事</h1>
      <ul>
        {blogs.contents.map((blog) => (
          <li className={style.list} key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <a>
                <Image
                  src={`/ogp/${blog.id}.png`}
                  alt="ブログ画像"
                  width={900}
                  height={472.5}
                />
                <p>{blog.title}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlogTopArticleList;
