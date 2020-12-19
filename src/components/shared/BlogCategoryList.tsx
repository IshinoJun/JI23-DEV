import Link from 'next/link';
import React from 'react';
import ArrayList from '../../models/Array';
import Category from '../../models/Category';
import style from './BlogCategoryList.module.scss';

interface Props {
  categories: ArrayList<Category>;
}

const BlogCategoryList: React.FC<Props> = (props) => {
  const { categories } = props;

  return (
    <aside className={style.tagWrapper}>
      <h2>Categories</h2>
      <ul>
        {categories.contents.map((category) => (
          <li key={category.id}>
            <Link href={`/blogs/categories/${category.id}/page/1`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlogCategoryList;
