import Link from 'next/link';
import React from 'react';
import Blog from '../../models/Blog';
import { pagesPath } from '../../utils/$path';
import style from './BlogNewList.module.scss';

interface Props {
  blogs: Blog[];
}

const BlogNewList: React.FC<Props> = (props) => {
  const { blogs } = props;

  return (
    <div className={style.wrapper}>
      <h1>New Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li className={style.list} key={blog.id}>
            <Link href={pagesPath.blogs._id(blog.id).$url()}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogNewList;
