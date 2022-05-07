import { LanguageFn } from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/vs2015.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { Blog, Category, Tag } from '../../../models';
import { TwitterFollowButton } from '../../common/button/TwitterFollowButton';
import { Tags } from '../../common/tag/Tags';
import style from './Blog.module.scss';
import { BlogBreadcrumbs } from './BlogBreadcrumbs';
import { BlogCategory } from './BlogCategory';
import { BlogDate } from './BlogDate';
import { BlogShare } from './BlogShare';
import { BlogTopArticleList } from './BlogTopArticleList';

hljs.registerLanguage('javascript', javascript as unknown as LanguageFn);
hljs.registerLanguage('typescript', typescript as unknown as LanguageFn);
hljs.registerLanguage('java', java as unknown as LanguageFn);
hljs.registerLanguage('scss', scss as unknown as LanguageFn);
hljs.registerLanguage('xml', xml as unknown as LanguageFn);
hljs.registerLanguage('json', json as unknown as LanguageFn);

interface Props {
  blog: Blog;
  topArticleBlogs: Blog[];
  category?: Category;
  tag?: Tag;
}

export const BlogComponent: React.FC<Props> = (props: Props) => {
  const { blog, category, tag, topArticleBlogs } = props;
  const router = useRouter();

  useEffect(() => {
    hljs.initHighlighting();
    // hljsの闇
    (hljs.initHighlighting as unknown as { called: boolean }).called = false;
  }, [router]);

  return (
    <>
      <section className={style.contact}>
        <div className={style.blogTop}>
          <figure className={style.img}>
            <Image
              src={blog.blogImage.url}
              width={blog.blogImage.width}
              height={blog.blogImage.height}
              alt='ブログトップ画像'
            />
          </figure>
        </div>
        <div className={style.blog}>
          <BlogDate blog={blog} />
          <h1>{blog.title}</h1>
          <BlogCategory category={blog.category} doLink />
          <Tags tags={blog.tags} tagsPosition='left' doLink />
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
