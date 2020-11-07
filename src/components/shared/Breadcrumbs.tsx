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
    '/blogs/[id]': { title: 'ブログ' },
    '/contact': { title: '問い合わせ' },
    '/contact/success': { title: '問い合わせ成功' },
    '/contact/error': { title: '問い合わせ失敗' },
  };

  const pathNames = router.pathname.split('/').filter((e) => e.length > 0);

  const links: JSX.Element[] = [];
  if (pathNames.length === 0) return links;

  let pathnameHistory: keyof typeof routing = '/';

  for (let i = 0; i <= pathNames.length; i += 1) {
    const target = routing[pathnameHistory as keyof typeof routing];

    links.push(
      pathNames.length !== i ? (
        <Link href="/" key={target.title}>
          {target.title}
        </Link>
      ) : (
        <Typography color="textPrimary" key={target.title}>
          {target.title}
        </Typography>
      ),
    );
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
