import React from 'react';
import Image from 'next/image';
import style from './TwitterFollowButton.module.scss';

const TwitterFollowButton: React.FC = () => {
  return (
    <div className={style.followWrap}>
      <a
        className={style.follow}
        href="https://twitter.com/JJ_1123_I?ref_src=twsrc%5Etfw"
        data-size="large"
        data-lang="ja"
        data-show-count="false"
      >
        <Image src="/twitterLogoWhite.svg" height={17} width={31} />
        <div className={style.followLinkText}>@JJ_1123_Iをフォロー</div>
      </a>
    </div>
  );
};

export default TwitterFollowButton;
