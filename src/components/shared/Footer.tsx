import Link from 'next/link';
import React from 'react';
import { pagesPath } from '../../utils/$path';
import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <ul className={style.footerContent}>
          <li>
            <Link href={pagesPath.$url()}>ホーム</Link>
          </li>
          <li>
            <Link href={pagesPath.profile.$url()}>運営者</Link>
          </li>
          <li>
            <Link href={pagesPath.blogs.sitemap.$url()}>
              ブログサイトマップ
            </Link>
          </li>
          <li>
            <Link href={pagesPath.privacy.$url()}>プライバシーポリシー</Link>
          </li>
          <li>
            <Link href={pagesPath.contact.$url()}>お問い合わせ</Link>
          </li>
        </ul>
        <p className={style.title}>© JI23-DEV</p>
      </div>
    </footer>
  );
};

export default Footer;
