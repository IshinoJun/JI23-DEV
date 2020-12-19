import Link from 'next/link';
import React from 'react';
import Category from '../../models/Category';
import style from './BlogCategory.module.scss';

interface Props {
  category: Category;
}
const BlogCategory: React.FC<Props> = (props: Props) => {
  const { category } = props;

  return (
    <span className={style.category}>
      カテゴリー:
      <Link href={`/blogs/categories/${category.id}/page/1`}>
        {category.name}
      </Link>
    </span>
  );
};

export default BlogCategory;
