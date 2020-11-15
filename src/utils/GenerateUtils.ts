import { NextRouter } from 'next/router';
import BlogsQuery from '../models/BlogsQuery';
import HeaderParams from '../models/HeaderParams';
import HeadParams from '../models/HeadParams';

const generateHeaderParams = (router: NextRouter): HeaderParams => {
  const { pathname } = router;

  switch (pathname) {
    case '/profile':
      return {
        title: 'Profile',
        subTitle: 'プロフィール',
        linkProps: { href: '/' },
        imgProps: { src: '/profile.png', alt: 'Profile' },
      };
    case '/portfolio':
      return {
        title: 'Portfolio',
        subTitle: 'ポートフォリオ',
        linkProps: { href: '/' },
        imgProps: { src: '/portfolio.png', alt: 'Portfolio' },
      };
    case '/blogs':
      return {
        title: 'Blogs',
        subTitle: 'ブログ一覧',
        linkProps: { href: '/' },
        imgProps: { src: '/blog.png', alt: 'Blogs' },
      };
    case '/blogs/search':
    case '/blogs/tags/[id]':
      return {
        title: 'Blogs',
        subTitle: 'ブログ一覧',
        linkProps: { href: '/blogs' },
        imgProps: { src: '/blog.png', alt: 'Blogs' },
      };
    case '/blogs/[id]':
      return {
        title: 'Blog',
        subTitle: 'ブログ',
        linkProps: { href: '/blogs' },
        imgProps: { src: '/blog.png', alt: 'Blogs' },
      };
    case '/contact':
    case '/contact/success':
    case '/contact/error':
      return {
        title: 'Contact',
        subTitle: 'お問い合わせ',
        linkProps: { href: '/' },
        imgProps: { src: '/contact.png', alt: 'Contact' },
      };
    case '/404':
      return {
        title: 'Error',
        subTitle: 'エラー',
        linkProps: { href: '/' },
        imgProps: { src: '/icon.png', alt: 'エラー' },
      };
    default: {
      return {
        title: '',
        subTitle: '',
        linkProps: { href: '/' },
        imgProps: { src: '/', alt: '' },
      };
    }
  }
};

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
        title: 'Portfolio',
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
    case '/blogs/search':
    case '/blogs/tags/[id]':
      return {
        title: 'Blogs',
        type: 'article',
        url: `${router.asPath}`,
      };
    case '/blogs/[id]':
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
  if (query.keyword && query.tagId) {
    return `blogs?filters=title[contains]${query.keyword}[or]content[contains]${query.keyword}[or]tags[contains]${query.tagId}`;
  }
  if (query.keyword) {
    return `blogs?q=${encodeURI(query.keyword)}`;
  }
  if (query.tagId) {
    return `blogs?filters=tags[contains]${query.tagId}`;
  }

  return null;
};

export { generateHeaderParams, generateHeadParams, generateBlogsUrl };
