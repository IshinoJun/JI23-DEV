import Link from 'next/link';
import React from 'react';
import Blog from '../../models/Blog';
import style from './BlogNewList.module.scss';

interface Props {
  blogs: Blog[];
}

const BlogNewList: React.FC<Props> = (props) => {
  const { blogs } = props;

  return (
    <div>
      <h1 className={style.title}>最新の記事</h1>
      <ul>
        {blogs.map((blog) => (
          <li className={style.list} key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogNewList;
