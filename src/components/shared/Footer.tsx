import Link from 'next/link';
import React from 'react';
import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <ul className={style.footerContent}>
          <li>
            <Link href="/">ホーム</Link>
          </li>
          <li>
            <Link href="/profile">運営者</Link>
          </li>
          <li>
            <Link href="/blogs/sitemap">ブログサイトマップ</Link>
          </li>
          <li>
            <Link href="/privacy">プライバシーポリシー</Link>
          </li>
          <li>
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
        <p className={style.title}>© JI23-DEV</p>
      </div>
    </footer>
  );
};

export default Footer;
