import Link from 'next/link';
import React from 'react';
import Blog from '../../models/Blog';
import style from './BlogTopArticleList.module.scss';

interface Props {
  blogs: Blog[];
}

const BlogTopArticleList: React.FC<Props> = (props) => {
  const { blogs } = props;

  return (
    <div className={style.wrapper}>
      <h1>Top Blogs</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li className={style.list} key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <a>
                <div>{index + 1}</div>
                <p>{blog.title}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTopArticleList;
