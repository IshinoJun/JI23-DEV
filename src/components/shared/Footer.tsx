import React from "react";
import style from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <span>Jun Ishino {new Date().getFullYear()} All right reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
