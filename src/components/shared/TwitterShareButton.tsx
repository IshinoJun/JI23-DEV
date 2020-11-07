import React from 'react';
import style from './TwitterShareButton.module.scss';

interface Props {
  url: string;
  text: string;
}

const TwitterShareButton: React.FC<Props> = (props) => {
  const { url, text } = props;

  const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(text)}&hashtags=JI23DEV`;

  return (
    <a
      href={shareUrl}
      className={style.button}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="/Twitter_Logo_WhiteOnBlue.svg"
        width="24"
        height="24"
        alt="ツイッターのアイコン"
      />
      <span>Share</span>
    </a>
  );
};

export default TwitterShareButton;
