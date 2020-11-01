import { Grid, TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import style from './ContactForm.module.scss';
import Contact from '../../models/Contact';
import SNS from '../../models/SNS';

interface Props {
  sns: SNS;
  onSubmit: (contact: Contact) => void;
  validationSchema: Yup.ObjectSchema<
    Yup.Shape<
      // eslint-disable-next-line @typescript-eslint/ban-types
      object | undefined,
      {
        name: string;
        email: string;
        body: string;
      }
    >
  >;
}

const ContactForm: React.FC<Props> = (props: Props) => {
  const { sns, validationSchema, onSubmit } = props;

  const { control, handleSubmit, errors } = useForm<Contact>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={style.form}>
      <div className={style.message}>
        <p>
          お問い合わせがある場合は、
          <a href={sns.twitterUrl} target="_blank" rel="noreferrer">
            Twitter
          </a>
          でDMして頂くか、下記のフォームからご連絡ください。
        </p>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="name"
            label="お名前"
            name="name"
            autoComplete="name"
            defaultValue=""
            error={!!errors.name?.message}
          />
          {errors.name && <p className={style.error}>{errors.name.message}</p>}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            defaultValue=""
            error={!!errors.email?.message}
          />
          {errors.email && (
            <p className={style.error}>{errors.email.message}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            multiline
            rows={6}
            name="body"
            label="内容"
            id="body"
            autoComplete="body"
            defaultValue=""
            error={!!errors.body?.message}
          />
          {errors.body && <p className={style.error}>{errors.body.message}</p>}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        className={style.send}
        aria-label="送信"
      >
        送信
      </Button>
    </form>
  );
};

export default ContactForm;
