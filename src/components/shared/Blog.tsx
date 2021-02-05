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
import { useRouter } from 'next/router';
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
import BlogTopArticleList from './BlogTopArticleList';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

interface Props {
  blog: Blog;
  topArticleBlogs: Blog[];
  category?: Category;
  tag?: Tag;
}

const BlogComponent: React.FC<Props> = (props: Props) => {
  const { blog, category, tag, topArticleBlogs } = props;
  const router = useRouter();

  useEffect(() => {
    hljs.initHighlighting();
    // hljsの闇
    ((hljs.initHighlighting as unknown) as { called: boolean }).called = false;
  }, [router]);

  return (
    <>
      <section className={style.contact}>
        <div className={style.blogTop}>
          <figure className={style.img}>
            <Image
              src={blog.blogImage.url}
              width={150}
              height={150}
              alt="ブログトップ画像"
            />
          </figure>
        </div>
        <div className={style.blog}>
          <BlogDate blog={blog} />
          <h1>{blog.title}</h1>
          <BlogCategory category={blog.category} doLink />
          <Tags tags={blog.tags} tagsPosition="left" doLink />
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className={[style.content, style.pre, 'markdown-body'].join(' ')}
          />
          <TwitterFollowButton />
        </div>
        <aside>
          <div className={style.bottomWrap}>
            <BlogShare blog={blog} />
          </div>
          <div className={style.bottomWrap}>
            <BlogTopArticleList topArticleBlogs={topArticleBlogs} />
          </div>
          <div className={style.breadcrumbsWrapper}>
            <BlogBreadcrumbs blog={blog} category={category} tag={tag} />
          </div>
        </aside>
      </section>
    </>
  );
};

export default BlogComponent;
