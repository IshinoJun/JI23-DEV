import { NextRouter } from 'next/router';
import { BlogsQuery, HeadParams } from '../models';

const generateHeadParams = (router: NextRouter): HeadParams => {
  const { pathname } = router;

  switch (pathname) {
    case '/':
      return {
        title: 'Home',
        type: 'website',
        url: `${router.asPath}`,
      };
    case '/profile':
      return {
        title: 'profile',
        type: 'article',
        url: `${router.asPath}`,
      };
    case '/portfolio':
      return {
        title: 'Portfolio',
        type: 'article',
        url: `${router.asPath}`,
      };
    case '/blogs':
    case '/blogs/page/[offset]':
      return {
        title: 'Blogs',
        type: 'article',
        url: `${router.asPath}`,
      };
    case '/blogs/search': {
      const urlQuery = router.query as BlogsQuery;

      return {
        title: `「${urlQuery.keyword ?? ''}」の検索結果`,
        type: 'article',
        url: `${router.asPath}`,
      };
    }
    case '/blogs/[id]':
    case '/blogs/tags/[id]/page[offset]':
    case '/blogs/categories/[id]/page[offset]':
      return {
        type: 'article',
        url: `${router.asPath}`,
      };
    case '/contact':
      return {
        title: 'Contact',
        type: 'article',
        url: `${router.asPath}`,
      };
    case '/contact/success':
      return {
        title: 'Success',
        type: 'article',
        url: `${router.asPath}`,
      };
    case '/contact/error':
    case '/404':
      return {
        title: 'Error',
        type: 'article',
        url: `${router.asPath}`,
      };
    default: {
      return {
        title: 'JI23-DEV',
        type: 'article',
        url: `${router.asPath}`,
      };
    }
  }
};

// TODO:項目が増えたらちゃんと考える
const generateBlogsUrl = (query: BlogsQuery): string | null => {
  if (query.limit && query.offset && query.tagId) {
    return `blogs?filters=tags[contains]${query.tagId}&offset=${query.offset}&limit=${query.limit}`;
  }
  if (query.limit && query.offset && query.categoryId) {
    return `blogs?filters=category[equals]${query.categoryId}&offset=${query.offset}&limit=${query.limit}`;
  }
  if (query.keyword && query.tagId) {
    return `blogs?filters=title[contains]${query.keyword}[or]content[contains]${query.keyword}[or]tags[contains]${query.tagId}`;
  }
  if (query.keyword) {
    return `blogs?q=${encodeURI(query.keyword)}`;
  }
  if (query.tagId) {
    return `blogs?filters=tags[contains]${query.tagId}`;
  }
  if (query.categoryId) {
    return `blogs?filters=tags[contains]${query.categoryId}`;
  }
  if (query.limit && query.offset) {
    return `blogs?offset=${query.offset}&limit=${query.limit}`;
  }

  if (query.ids) {
    const str = query.ids.join(',');

    return `blogs?ids=${str}`;
  }

  return null;
};

export { generateHeadParams, generateBlogsUrl };
