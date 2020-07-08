import React from "react";
import FooterStyle from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={FooterStyle.container}>
        <div className={FooterStyle.footerContent}>
          <span>Jun Ishino {new Date().getFullYear()} All right reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
