import Link from 'next/link';
import React from 'react';
import Category from '../../models/Category';
import style from './BlogCategory.module.scss';

interface Props {
  category: Category;
  doLink?: boolean;
}
const BlogCategory: React.FC<Props> = (props: Props) => {
  const { category, doLink } = props;

  return (
    <>
      {doLink ? (
        <Link href={`/blogs/categories/${category.id}/page/1`}>
          <a data-is-hover={doLink} className={style.category}>
            {category.name}
          </a>
        </Link>
      ) : (
        <span className={style.category}>{category.name}</span>
      )}
    </>
  );
};

export default BlogCategory;
