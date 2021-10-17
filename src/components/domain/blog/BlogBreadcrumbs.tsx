import {
  Breadcrumbs as MaterialBreadcrumbs,
  Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';
import * as React from 'react';
import { Blog, Category, Tag } from '../../../models';
import { pagesPath } from '../../../utils/$path';
import style from './BlogBreadcrumbs.module.scss';

interface Props {
  blog?: Blog;
  tag?: Tag;
  category?: Category;
  keyword?: string;
}

export const BlogBreadcrumbs: React.FC<Props> = (props) => {
  const { blog, tag, category, keyword } = props;

  return (
    <div className={style.wrapper}>
      <MaterialBreadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        <Link href={pagesPath.$url()}>ホーム</Link>
        <Link href={pagesPath.blogs.$url()}>ブログ一覧</Link>
        {tag && (
          <Link href={pagesPath.blogs.tags._id(tag.id).page._offset(1).$url()}>
            {tag.name}
          </Link>
        )}
        {category && (
          <Link
            href={pagesPath.blogs.categories
              ._id(category.id)
              .page._offset(1)
              .$url()}
          >
            {category.name}
          </Link>
        )}
        {keyword && <Typography color='textPrimary'>{keyword}</Typography>}
        {blog && (
          <Link
            href={pagesPath.blogs.categories
              ._id(blog.category.id)
              .page._offset(1)
              .$url()}
          >
            {blog.category.name}
          </Link>
        )}
      </MaterialBreadcrumbs>
    </div>
  );
};
