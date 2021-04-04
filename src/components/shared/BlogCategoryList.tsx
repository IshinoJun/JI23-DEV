import Link from 'next/link';
import React from 'react';
import ArrayList from '../../models/Array';
import Category from '../../models/Category';
import { pagesPath } from '../../utils/$path';
import style from './BlogCategoryList.module.scss';

interface Props {
  categories: ArrayList<Category>;
}

const BlogCategoryList: React.FC<Props> = (props) => {
  const { categories } = props;

  return (
    <div className={style.tagWrapper}>
      <h2>Categories</h2>
      <ul>
        {categories.contents.map((category) => (
          <li key={category.id}>
            <Link
              href={pagesPath.blogs.categories
                ._id(category.id)
                .page._offset(1)
                .$url()}
            >
              {`${category.name}(${category.posts.length})`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategoryList;
