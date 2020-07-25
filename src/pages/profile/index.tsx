import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import DevClient from "../api/DevClient";
import Profile from "../../models/Profile";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";
import HeadProps from "../../models/HeadProps";
import { useRouter } from "next/router";
import { useContextImageContext } from "../../context/ImageContext";

interface Props {
  profile: Profile;
}

const ProfileIndex: NextPage<Props> = (props: Props) => {
  const { profile } = props;
  const router = useRouter();

  const images = useContextImageContext();

  const headerProps: HeaderProps = {
    title: "Profile",
    subTitle: "プロフィール",
    linkProps: { href: "/" },
    imgProps: { src: images.profileImage.url, alt: "Profile" },
  } as const;

  const headProps: HeadProps = {
    title: "Profile",
    type: "article",
    description: "JI23-DEVのプロフィールのページになります。",
    image: images.profileImage.url,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

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
    <Layout headProps={headProps} headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.content}>
            <div className={style.title}>
              <h3>About me</h3>
              {profile.introduction.split("\n").map((intro, index) => (
                <p key={index}>{intro}</p>
              ))}
            </div>
            <div className={style.about}>
              <div className={style.name}>
                <h2>{profile.name}</h2>
                <h4>{profile.profession}</h4>
              </div>
              <div>
                <dl>
                  <dt>誕生年 / 年齢</dt>
                  <dd>
                    {profile.year} / {getAge()}
                  </dd>
                </dl>
                <dl>
                  <dt>技術スタック</dt>
                  <dd>
                    <ul>
                      {profile.skills.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                      ))}
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>資格・認定</dt>
                  <dd>
                    <ul>
                      {profile.qualifications.map((qualification, index) => (
                        <li key={index}>{qualification.name}</li>
                      ))}
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>趣味</dt>
                  <dd>
                    {profile.hobbies.map(
                      (hobby, index) =>
                        hobby.name +
                        (profile.hobbies.length !== index + 1 ? "、　" : "")
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devClient = new DevClient();

  const profile = await devClient.getProfile();

  return {
    props: {
      profile,
    },
  };
};

export default ProfileIndex;
