import { Card } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Blog } from '../../../models';
import { pagesPath } from '../../../utils/$path';
import { BlogDate } from './BlogDate';
import style from './BlogTopArticleList.module.scss';

interface Props {
  topArticleBlogs: Blog[];
}

export const BlogTopArticleList: React.FC<Props> = (props) => {
  const { topArticleBlogs } = props;

  return (
    <div className={style.topBlogArea}>
      <div className={style.title}>
        <Image src='/ranking.svg' height={35} width={35} alt='RANKING' />
        <p>RANKING</p>
      </div>
      {topArticleBlogs.map((topBlog, index) => (
        <Card variant='outlined' className={style.list} key={topBlog.id}>
          <Link href={pagesPath.blogs._id(topBlog.id).$url()}>
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
