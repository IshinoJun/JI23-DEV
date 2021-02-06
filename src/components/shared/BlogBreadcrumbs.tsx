import {
  Breadcrumbs as MaterialBreadcrumbs,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import Link from 'next/link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Category from '../../models/Category';
import Blog from '../../models/Blog';
import Tag from '../../models/Tag';
import style from './BlogBreadcrumbs.module.scss';

interface Props {
  blog?: Blog;
  tag?: Tag;
  category?: Category;
  keyword?: string;
}

const BlogBreadcrumbs: React.FC<Props> = (props) => {
  const { blog, tag, category, keyword } = props;

  return (
    <div className={style.wrapper}>
      <MaterialBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link href="/">ホーム</Link>
        <Link href="/blogs">ブログ一覧</Link>
        {tag && <Link href={`/blogs/tags/${tag.id}/page/1`}>{tag.name}</Link>}
        {category && (
          <Link href={`/blogs/categories/${category.id}/page/1`}>
            {category.name}
          </Link>
        )}
        {keyword && <Typography color="textPrimary">{keyword}</Typography>}
        {blog && (
          <Link href={`/blogs/categories/${blog.category.id}/page/1`}>
            {blog.category.name}
          </Link>
        )}
      </MaterialBreadcrumbs>
    </div>
  );
};

export default BlogBreadcrumbs;
