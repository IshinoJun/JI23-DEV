import { LinkProps } from "next/link";

interface HeaderProps {
  title: string;
  subTitle: string;
  linkProps: LinkProps;
  imgProps: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

export default HeaderProps;
