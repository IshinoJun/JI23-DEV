import { Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import Image from 'next/image';
import React from 'react';
import { IconButtonType } from '../../enums';
import style from './IconButton.module.scss';

interface Props {
  iconButtonType: IconButtonType;
  // TODO:本当はbuttonPropsを送りたいが型がわからんかった
  href: string;
  ariaLabel: string;
}

const GitHubButton: React.FC<Props> = (props: Props) => {
  const { href, iconButtonType, ariaLabel } = props;

  const renderButton = (): JSX.Element => {
    switch (iconButtonType) {
      case IconButtonType.gitHub: {
        return (
          <Button
            variant='contained'
            className={style.github}
            href={href}
            target='_blank'
            rel='noreferrer'
            aria-label={ariaLabel}
          >
            <GitHubIcon />
          </Button>
        );
      }

      case IconButtonType.twitter: {
        return (
          <Button
            variant='contained'
            className={style.twitter}
            href={href}
            target='_blank'
            rel='noreferrer'
            aria-label={ariaLabel}
          >
            <TwitterIcon />
          </Button>
        );
      }

      case IconButtonType.siteLink: {
        return (
          <Button
            variant='contained'
            href={href}
            target='_blank'
            rel='noreferrer'
            aria-label={ariaLabel}
          >
            <LinkIcon />
          </Button>
        );
      }

      case IconButtonType.zenn: {
        return (
          <Button
            variant='contained'
            className={style.zenn}
            href={href}
            target='_blank'
            rel='noreferrer'
            aria-label={ariaLabel}
          >
            <Image src='/zenn.jpeg' alt='ブログ画像' width={32} height={24} />
          </Button>
        );
      }

      default: {
        return <></>;
      }
    }
  };

  return renderButton();
};

export default GitHubButton;
