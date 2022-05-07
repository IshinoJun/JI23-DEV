import classNames from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { DevCMS } from '../../clients';
import { Category, List } from '../../models';
import { pagesPath } from '../../utils/$path';
import style from './sitemap.module.scss';

interface Props {
  categories: List<Category>;
}

const BlogSitemapPage: NextPage<Props> = (props) => {
  const { categories } = props;
  const title = 'Sitemap | JI23-DEV';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='twitter:title' content={title} />
      </Head>
      <section className='padding-block border-bottom'>
        <div className={classNames(style.blogsContainer, 'container')}>
          <h1>Sitemap</h1>
          <div className={style.wrapper}>
            {categories.contents.map((category) => (
              <ul key={category.id} className={style.categoryList}>
                <li className={style.categoryListItem}>
                  <Link
                    href={pagesPath.blogs.categories
                      ._id(category.id)
                      .page._offset(1)
                      .$url()}
                  >
                    <a>{category.name}</a>
                  </Link>
                  <ul className={style.postList}>
                    {category.posts.map((post) => (
                      <li key={post.id} className={style.postListItem}>
                        <Link href={pagesPath.blogs._id(post.id).$url()}>
                          <a>{post.title}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();
  const categories = await devCMS.getCategories();

  return {
    props: {
      categories,
    },
  };
};

export default BlogSitemapPage;
