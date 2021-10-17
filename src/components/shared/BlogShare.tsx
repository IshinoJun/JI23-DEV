import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { Blog } from '../../models';
import style from './BlogShare.module.scss';

interface Props {
  blog: Blog;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

const BlogShare: React.FC<Props> = (props) => {
  const { blog } = props;

  return (
    <div className={style.shareArea}>
      <div className={style.title}>SHARE</div>
      <div className={style.linkArea}>
        <TwitterShareButton
          url={`${baseUrl}/blogs/${blog.id}`}
          title={blog.title}
        >
          <TwitterIcon round size={40} />
        </TwitterShareButton>
        <FacebookShareButton
          url={`${baseUrl}/blogs/${blog.id}`}
          title={blog.title}
        >
          <FacebookIcon round size={40} />
        </FacebookShareButton>
        <HatenaShareButton
          url={`${baseUrl}/blogs/${blog.id}`}
          title={blog.title}
        >
          <HatenaIcon round size={40} />
        </HatenaShareButton>
      </div>
    </div>
  );
};

export default BlogShare;
