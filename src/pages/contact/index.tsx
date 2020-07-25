import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";
import * as Yup from "yup";
import Contact from "../../models/Contact";
import { useContextDevClient } from "../../context/DevClientContext";
import { useRouter } from "next/router";
import SNS from "../../models/SNS";
import DevClient from "../../pages/api/DevClient";
import HeadProps from "../../models/HeadProps";
import ContactForm from "../../components/shared/ContactForm";
import { useContextImageContext } from "../../context/ImageContext";

interface Props {
  sns: SNS;
}

const ContactIndex: NextPage<Props> = (props: Props) => {
  const { sns } = props;

  const devClient = useContextDevClient();
  const images = useContextImageContext();

  const router = useRouter();

  const headerProps: HeaderProps = {
    title: "Contact",
    subTitle: "お問い合わせ",
    linkProps: { href: "/" },
    imgProps: { src: images.contactImage.url, alt: "Contact" },
  } as const;

  const headProps: HeadProps = {
    title: "Contact",
    type: "article",
    description: "JI23-DEVの問い合わせのページになります。",
    image: images.contactImage.url,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("名前は必須項目です"),
    email: Yup.string()
      .email("正しいメールアドレスではありません")
      .required("メールアドレスは必須です"),
    body: Yup.string().required("お問い合わせ内容は必須です。"),
  });

  const handleSubmit = (contact: Contact) => {
    void (async (): Promise<void> => {
      try {
        await devClient.createContact(contact);
      } catch (err) {
        void router.push("/contact/error");
        return;
      }

      void router.push("/contact/success");
    })();
  };

  return (
    <Layout headProps={headProps} headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.content}>
            <div className={style.contact}>
              <div className={style.title}>
                <h2>お問い合わせフォーム</h2>
              </div>
              <ContactForm
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                sns={sns}
              />
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

  const sns = await devClient.getSNS();

  return {
    props: {
      sns,
    },
  };
};

export default ContactIndex;
