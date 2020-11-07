import { NextRouter } from 'next/router';
import HeaderParams from '../models/HeaderParams';

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
    case '/blogs/[id]':
      return {
        title: 'Blog',
        subTitle: 'ブログ',
        linkProps: { href: '/blogs' },
        imgProps: { src: '/blog.png', alt: 'Blogs' },
      };
    case '/contact':
      return {
        title: 'Contact',
        subTitle: 'お問い合わせ',
        linkProps: { href: '/' },
        imgProps: { src: '/contact.png', alt: 'Contact' },
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

// eslint-disable-next-line import/prefer-default-export
export { generateHeaderParams };
