import Link from 'next/link';
import React from 'react';
import { Category } from '../../../models';
import { pagesPath } from '../../../utils/$path';
import style from './BlogCategory.module.scss';

interface Props {
  category: Category;
  doLink?: boolean;
}
export const BlogCategory: React.FC<Props> = (props: Props) => {
  const { category, doLink } = props;

  return (
    <>
      {doLink ? (
        <Link
          href={pagesPath.blogs.categories
            ._id(category.id)
            .page._offset(1)
            .$url()}
        >
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
