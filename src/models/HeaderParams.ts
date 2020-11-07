import { LinkProps } from 'next/link';

interface HeaderParams {
  title: string;
  subTitle: string;
  linkProps: LinkProps;
  imgProps: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

export default HeaderParams;
