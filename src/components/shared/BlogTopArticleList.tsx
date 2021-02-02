import { Card } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import Blog from '../../models/Blog';
import BlogDate from './BlogDate';
import style from './BlogTopArticleList.module.scss';

interface Props {
  topArticleBlogs: Blog[];
}

const BlogTopArticleList: React.FC<Props> = (props) => {
  const { topArticleBlogs } = props;

  return (
    <div className={style.topBlogArea}>
      {topArticleBlogs.map((topBlog, index) => (
        <Card variant="outlined" className={style.list} key={topBlog.id}>
          <Link href={`/blogs/${topBlog.id}`}>
            <a>
              <div>{index + 1}</div>
              <div>
                <h5>{topBlog.title}</h5>
                <BlogDate blog={topBlog} />
              </div>
            </a>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default BlogTopArticleList;
