import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import style from './privacy.module.scss';

const privacyPage: NextPage = () => {
  const title = 'プライバシーポリシー | JI23-DEV';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <section className="padding-block border-bottom">
        <div className="container">
          <h1>プライバシーポリシー</h1>
          <div className={style.wrapper}>
            <h2>個人情報の利用目的</h2>
            <p>
              当ブログでは、メールでのお問い合わせやコメントの際に、お名前（ハンドルネーム）・メールアドレス等の個人情報をご登録いただく場合があります。
              <br />
              これらの個人情報は、質問に対する回答や必要な情報をご連絡するために利用し、それ以外の目的では利用しません。
            </p>
            <h2>個人情報の第三者への開示</h2>
            <p>
              個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
              <br />
              ・本人のご了解がある場合
              <br />
              ・法令等への協力のため、開示が必要となる場合
            </p>
            <h2>個人情報の開示・訂正・追加・削除・利用停止</h2>
            <p>
              個人情報の開示・訂正・追加・削除・利用停止をご希望の場合には、ご本人であることを確認したうえで、速やかに対応致します。
            </p>
            <h2>Cookieについて</h2>
            <p>
              当ブログでは、一部のコンテンツにおいてCookieを利用しています。
              <br />
              Cookieとは、webコンテンツへのアクセスに関する情報であり、お名前・メールアドレス・住所・電話番号は含まれません。
              <br />
              また、お使いのブラウザ設定からCookieを無効にすることが可能です。
            </p>
            <h2>アクセス解析ツールについて</h2>
            <p>
              当ブログでは、Google
              Inc.が提供するアクセス解析ツール「Googleアナリティクス」を利用しています。
              Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ます。
              <br />
              Googleアナリティクスの詳細は「Googleアナリティクス利用規約」をご覧ください。
            </p>
            <h2>著作権について</h2>
            <p>
              当ブログで掲載している画像の著作権・肖像権等は各権利所有者に帰属します。権利を侵害する目的ではありません。
              記事の内容や掲載画像等に問題がある場合、各権利所有者様本人が直接メールでご連絡下さい。本人確認後、対応致します。
              また、当ブログのコンテンツ（記事・画像・その他プログラム）について、許可なく転載することを禁じます。引用の際は、当ブログへのリンクを掲載するとともに、転載であることを明記してください。
            </p>

            <h2>免責事項</h2>
            <p>
              当ブログからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
              当ブログのコンテンツについて、可能な限り正確な情報を掲載するよう努めていますが、誤情報が入り込んだり、情報が古くなっている場合があります。当ブログに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
            <h2>プライバシーポリシーの変更について</h2>
            <p>
              当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
              <br />
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
              <br />
              初出掲載：2020年12月19日
              <br />
              最終更新：2020年12月19日
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default privacyPage;
