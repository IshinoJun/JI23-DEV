import Image from 'next/image';
import * as React from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import { useEffect } from 'react';
import Blog from '../../models/Blog';
import style from './Blog.module.scss';
import Tags from './Tags';
import BlogDate from './BlogDate';
import BlogBreadcrumbs from './BlogBreadcrumbs';
import Category from '../../models/Category';
import Tag from '../../models/Tag';
import BlogCategory from './BlogCategory';
import BlogShare from './BlogShare';
import TwitterFollowButton from './TwitterFollowButton';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

interface Props {
  blog: Blog;
  category?: Category;
  tag?: Tag;
}

const BlogComponent: React.FC<Props> = (props: Props) => {
  const { blog, category, tag } = props;

  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <>
      <section className={style.contact}>
        <Image
          src={`/ogp/${blog.id}.png`}
          alt="ブログ画像"
          width={900}
          height={472.5}
        />
        <div className={style.blog}>
          <BlogDate blog={blog} />
          <h1>{blog.title}</h1>
          <BlogCategory category={blog.category} />
          <Tags tags={blog.tags} tagsPosition="left" />
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className={[style.content, style.pre, 'markdown-body'].join(' ')}
          />
          <TwitterFollowButton />
        </div>
        <BlogShare blog={blog} />
      </section>
      <div className={style.breadcrumbsWrapper}>
        <BlogBreadcrumbs blog={blog} category={category} tag={tag} />
      </div>
    </>
  );
};

export default BlogComponent;
