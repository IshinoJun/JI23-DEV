import { format } from 'date-fns';

function formatDate(value: Date): string {
  return format(value, 'yyyy-MM-dd');
}

function formatEndMonth(value: Date): string {
  return format(value, 'yyyy/M');
}

function formatOgpSetting(
  url: string,
  text = '',
  textPad = 40,
  txtSize = 60,
  width = 1200,
  hight = 630,
): string {
  return `${url}?txt-align=middle%2Ccenter&txt-clip=end%2C%20ellipsis&txt-font=sans-serif&txt=${text}&txt-pad=${textPad}&txt-size=${txtSize}&w=${width}&h=${hight}`;
}

export { formatEndMonth, formatDate, formatOgpSetting };
