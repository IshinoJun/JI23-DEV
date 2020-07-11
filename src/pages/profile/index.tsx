import React from "react";
import style from "./index.module.scss";

import { NextPage } from "next";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";

const ProfileIndex: NextPage = () => {
  const getAge = (year = 1992, month = 11, day = 23): number => {
    const birthdayDate = new Date(year, month - 1, day);
    const todayDate = new Date();

    let age = todayDate.getFullYear() - birthdayDate.getFullYear();

    const currentYearDate = new Date(
      todayDate.getFullYear(),
      birthdayDate.getMonth(),
      birthdayDate.getDate()
    );

    if (currentYearDate > todayDate) age = age - 1;

    return age;
  };

  return (
    <main className="wrapper">
      <Header
        title="Profile"
        subTitle="A Brief About Me"
        linkProps={{ href: "/" }}
        imgProps={{ src: "/profile.png", alt: "Profile" }}
      />
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.content}>
            <div className={style.title}>
              <h3>About me</h3>
              <p>
                2015年大学卒業後、某Slerにて4年間、クラウドサービス（IaaS,DaaS,PaaS）を全業種向けに提案・導入・運用を対応していました。
              </p>
              <p>
                2019年7月からWebアプリ開発へ転身。SPAの設計・開発・テストをフロントとバックともに行なっています。
              </p>
            </div>
            <div className={style.about}>
              <div className={style.name}>
                <h2>Jun Ishino</h2>
                <h4>Web Developer</h4>
              </div>
              <div>
                <dl>
                  <dt>誕生年 / 年齢</dt>
                  <dd>1992 / {getAge()}</dd>
                </dl>
                <dl>
                  <dt>技術スタック</dt>
                  <dd>
                    <ul>
                      <li>React / TypeScript / Next.js</li>
                      <li>Spring Boot / Java</li>
                      <li>AWS</li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>資格・認定</dt>
                  <dd>
                    <ul>
                      <li>
                        AWS Certified Solutions Architect - Professional
                        (SAP)（2018-09）
                      </li>
                      <li>
                        AWS Certified Solutions Architect - Associate
                        (SAA)（2018-03）
                      </li>
                      <li>ORACLE MASTER Silver Oracle Database（2016-09）</li>
                      <li>ITIL Foundation（2016-09）</li>
                      <li>ORACLE MASTER Bronze Oracle Database（2016-04）</li>
                      <li>剣道三段（2014-09）</li>
                      <li>基本情報技術者（2014-04）</li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>趣味</dt>
                  <dd>筋トレ、 ドライブ、 温泉・サウナ</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};
export default ProfileIndex;
