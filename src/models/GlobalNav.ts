import { LinkProps } from 'next/link';

interface GlobalNav {
  title: string;
  subTitle: string;
  linkProps: LinkProps;
  imgProps: React.ImgHTMLAttributes<HTMLImageElement>;
}

export default GlobalNav;
