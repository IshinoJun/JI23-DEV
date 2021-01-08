import Image from 'next/image';
import * as React from 'react';
import Blog from '../../models/Blog';
import style from './Blog.module.scss';
import Tags from './Tags';
import BlogDate from './BlogDate';
import BlogBreadcrumbs from './BlogBreadcrumbs';
import Category from '../../models/Category';
import Tag from '../../models/Tag';
import BlogCategory from './BlogCategory';

interface Props {
  blog: Blog;
  category?: Category;
  tag?: Tag;
}

const BlogComponent: React.FC<Props> = (props: Props) => {
  const { blog, category, tag } = props;

  return (
    <div className={style.contact}>
      <div className={style.blog}>
        <Image
          src={`/ogp/${blog.id}.png`}
          alt="ブログ画像"
          width={900}
          height={472.5}
        />
        <div className={style.breadcrumbsWrapper}>
          <BlogBreadcrumbs blog={blog} category={category} tag={tag} />
        </div>
        <div className={style.entryHeader}>
          <h1>{blog.title}</h1>
          <BlogDate blog={blog} />
          <BlogCategory category={blog.category} />
          <Tags tags={blog.tags} tagsPosition="left" />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className={[style.content, style.pre, 'markdown-body'].join(' ')}
        />
      </div>
    </div>
  );
};

export default BlogComponent;
