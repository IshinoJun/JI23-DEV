import React from "react";
import index from "./index.module.scss";

import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className={index.wrapper}>
      <p>
        SSRだよー！!!毎回スターの数（更新されれば）とビルド時間はビルド後から変わらないよー！
      </p>
      <p>Next.JSのスター数：</p>
      <p>ビルド時間：</p>
    </div>
  );
};
export default Home;
