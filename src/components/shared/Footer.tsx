import React from 'react';
import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <span>&copy; {new Date().getFullYear()} JI23-DEV</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
