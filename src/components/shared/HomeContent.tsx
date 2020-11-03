import React from 'react';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import style from './HomeContent.module.scss';

interface Props {
  linkProps: LinkProps;
  imgProps: React.ComponentProps<typeof Image>;
  name: string;
}

const HomeContent: React.FC<Props> = (props: Props) => {
  const { linkProps, imgProps, name } = props;

  return (
    <Link {...linkProps}>
      <a className={style.content}>
        <div className={style.before}>
          <Image {...imgProps} alt="コンテンツの画像" />
        </div>
        <span className={style.after}>{name}</span>
      </a>
    </Link>
  );
};

export default HomeContent;
