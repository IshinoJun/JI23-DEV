import { Card } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
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
      <div className={style.title}>
        <Image src="/ranking.svg" height={35} width={35} />
        <p>RANKING</p>
      </div>
      {topArticleBlogs.map((topBlog, index) => (
        <Card variant="outlined" className={style.list} key={topBlog.id}>
          <Link href={`/blogs/${topBlog.id}`}>
            <a>
              <div className={style.rank}>{index + 1}</div>
              <div>
                <p>{topBlog.title}</p>
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
