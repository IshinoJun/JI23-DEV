import {
  Breadcrumbs as MaterialBreadcrumbs,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import style from './Breadcrumbs.module.scss';

const renderBreadcrumbs = (router: NextRouter) => {
  const routing = {
    '/': { title: 'トップページ' },
    '/profile': { title: 'プロフィール' },
    '/portfolio': { title: 'ポートフォリオ' },
    '/blogs': { title: 'ブログ一覧' },
    '/blogs/page/[offset]': { title: `ページ${String(router.query.offset)}` },
    '/blogs/[id]': { title: 'ブログ' },
    '/blogs/search': { title: '検索結果' },
    '/blogs/tags/[id]': { title: 'タグ検索' },
    '/contact': { title: '問い合わせ' },
    '/contact/success': { title: '問い合わせ成功' },
    '/contact/error': { title: '問い合わせ失敗' },
    '/404': { title: 'エラー' },
  };

  const pathNames = router.pathname.split('/').filter((e) => e.length > 0);

  const links: JSX.Element[] = [];
  if (pathNames.length === 0) return links;

  let pathnameHistory: keyof typeof routing = '/';

  for (let i = 0; i <= pathNames.length; i += 1) {
    // TODO:いい感じの型にする必要がある
    const target = routing[pathnameHistory as keyof typeof routing] as
      | { title: string }
      | undefined;

    if (typeof target !== 'undefined') {
      links.push(
        pathNames.length !== i ? (
          <Link href={pathnameHistory} key={target.title}>
            {target.title}
          </Link>
        ) : (
          <Typography color="textPrimary" key={target.title}>
            {target.title}
          </Typography>
        ),
      );
    }

    pathnameHistory += pathnameHistory.endsWith('/')
      ? pathNames[i]
      : `/${pathNames[i]}`;
  }

  return links;
};

const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const breadcrumbs = renderBreadcrumbs(router);

  return (
    <div className={style.wrapper}>
      <MaterialBreadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb) => breadcrumb)}
      </MaterialBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
