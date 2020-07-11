import React from "react";
import style from "./Header.module.scss";
import Link, { LinkProps } from "next/link";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  title: string;
  subTitle: string;
  linkProps: LinkProps;
  imgProps: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

const Header: React.FC<Props> = (props: Props) => {
  const { title, subTitle, linkProps, imgProps } = props;

  return (
    <header className={style.head}>
      <div className="container">
        <div className={style.row}>
          <div className={style.titleArea}>
            <div className={style.icon}>
              <img {...imgProps} />
            </div>
            <div>
              <h2>{title}</h2>
              <h4>{subTitle}</h4>
            </div>
          </div>
          <Link {...linkProps}>
            <IconButton size="medium" className={style.close}>
              <CloseIcon />
            </IconButton>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
