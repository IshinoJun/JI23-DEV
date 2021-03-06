import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import style from './index.module.scss';

import Contact from '../../models/Contact';
import SNS from '../../models/SNS';
import DevCMS from '../api/DevCMS';
import ContactForm from '../../components/shared/ContactForm';
import fetchWrapper from '../../utils/FetchUtils';

interface Props {
  sns: SNS;
}

const ContactIndex: NextPage<Props> = (props: Props) => {
  const { sns } = props;
  const router = useRouter();

  const handleSubmit = async (contact: Contact): Promise<void> => {
    try {
      await fetchWrapper.post('/api/contact', contact);
      void router.push('/contact/success');
    } catch (err) {
      void router.push('/contact/error');
    }
  };

  return (
    <section className="padding-block border-bottom">
      <div className="container">
        <div className={style.content}>
          <div className={style.contact}>
            <div className={style.title}>
              <h2>お問い合わせフォーム</h2>
            </div>
            <ContactForm onSubmit={handleSubmit} sns={sns} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();

  const sns = await devCMS.getSNS();

  return {
    props: {
      sns,
    },
  };
};

export default ContactIndex;
