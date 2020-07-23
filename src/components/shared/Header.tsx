import React from "react";
import style from "./Header.module.scss";
import Link from "next/link";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HeaderProps from "../../models/HeaderProps";
import useMedia from "../../hooks/useMedia";

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, subTitle, linkProps, imgProps } = props;
  const isTab = useMedia("tab");

  return (
    <header className={style.head}>
      <div className={style.logo}>
        <Link href="/" as={`/`}>
          <a>
            <img src="/logo.png" />
          </a>
        </Link>
      </div>
      <div className="container">
        <div className={style.row}>
          <div className={style.titleArea}>
            <div className={style.icon}>
              <img {...imgProps} />
            </div>
            <div>
              <h2>{title}</h2>
              <h4 style={{ fontWeight: "normal" }}>{subTitle}</h4>
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
