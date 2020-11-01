import { Event } from '../models/Event';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const pageView = (path: string): void => {
  if (GA_ID) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    window.gtag('config', GA_ID, {
      page_path: path,
    });
  }
};

const event = ({ action, category, label }: Event): void => {
  if (GA_ID) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    window.gtag('event', action, {
      event_category: category,
      event_label: JSON.stringify(label),
    });
  }
};

export { GA_ID, pageView, event };
