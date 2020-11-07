import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import style from './index.module.scss';

import DevCMS from '../api/DevCMS';
import Profile from '../../models/Profile';
import Layout from '../../components/shared/Layout';
import HeadProps from '../../models/HeadProps';

interface Props {
  profile: Profile;
}

const ProfileIndex: NextPage<Props> = (props: Props) => {
  const { profile } = props;
  const router = useRouter();

  const headProps: HeadProps = {
    title: 'Profile',
    type: 'article',
    url: `${router.asPath}`,
  } as const;

  const getAge = (year = 1992, month = 11, day = 23): number => {
    const birthdayDate = new Date(year, month - 1, day);
    const todayDate = new Date();

    let age = todayDate.getFullYear() - birthdayDate.getFullYear();

    const currentYearDate = new Date(
      todayDate.getFullYear(),
      birthdayDate.getMonth(),
      birthdayDate.getDate(),
    );

    if (currentYearDate > todayDate) age -= 1;

    return age;
  };

  return (
    <Layout headProps={headProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.content}>
            <div className={style.title}>
              <h3>About me</h3>
              {profile.introduction.split('\n').map((intro, index) => (
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
                      {profile.skills.map((skill) => (
                        <li key={skill.id}>{skill.name}</li>
                      ))}
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>資格・認定</dt>
                  <dd>
                    <ul>
                      {profile.qualifications.map((qualification) => (
                        <li key={qualification.id}>{qualification.name}</li>
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
                        (profile.hobbies.length !== index + 1 ? '、　' : ''),
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
  const devCMS = new DevCMS();

  const profile = await devCMS.getProfile();

  return {
    props: {
      profile,
    },
  };
};

export default ProfileIndex;
