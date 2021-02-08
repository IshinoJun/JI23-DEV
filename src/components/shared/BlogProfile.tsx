import * as React from 'react';
import { Avatar } from '@material-ui/core';
import IconButtonType from '../../enums/IconButtonType';
import style from './BlogProfile.module.scss';
import IconButton from './IconButton';

const BlogProfile: React.FC = () => {
  return (
    <div className={style.profile}>
      <div className={style.nameArea}>
        <Avatar
          className={style.icon}
          src="/myIcon.png"
          alt="カバのロボットのロゴ画像"
        />
        <h2>Jun Ishino</h2>
      </div>
      <div className={style.profileContentArea}>
        <p className={style.description}>
          フロントエンド（バック）エンジニア。技術的なことをゆる〜くブログに書いてます。
        </p>
        <div className={style.linkArea}>
          <IconButton
            iconButtonType={IconButtonType.twitter}
            href="https://twitter.com/JJ_1123_I"
            ariaLabel="twitterのリンク"
          />
          <IconButton
            iconButtonType={IconButtonType.gitHub}
            href="https://github.com/IshinoJun"
            ariaLabel="gitHubのリンク"
          />
          <IconButton
            iconButtonType={IconButtonType.zenn}
            href="https://zenn.dev/jun1123"
            ariaLabel="zennのリンク"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogProfile;
