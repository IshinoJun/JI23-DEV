import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import ArrayList from '../../models/Array';
import Category from '../../models/Category';
import DevCMS from '../api/DevCMS';
import style from './sitemap.module.scss';

interface Props {
  categories: ArrayList<Category>;
}

const BlogSitemapPage: NextPage<Props> = (props) => {
  const { categories } = props;
  const title = 'Sitemap | JI23-DEV';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <section className="padding-block border-bottom">
        <div className={`${String(style.container)} container`}>
          <h1>Sitemap</h1>
          <div className={style.wrapper}>
            {categories.contents.map((category) => (
              <ul key={category.id}>
                <li className={style.category}>
                  <Link href="/category/[id]" as={`/category/${category.id}`}>
                    <a>{category.name}</a>
                  </Link>
                </li>
                <li className={style.postList}>
                  <ul>
                    {category.posts.map((post) => (
                      <li key={post.id}>
                        <Link href="/blogs/[id]" as={`/blogs/${post.id}`}>
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
