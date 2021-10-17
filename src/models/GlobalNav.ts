import { LinkProps } from 'next/link';

export interface GlobalNav {
  title: string;
  subTitle: string;
  linkProps: LinkProps;
  imgProps: React.ImgHTMLAttributes<HTMLImageElement>;
}
