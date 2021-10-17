import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRouterScroll = (): void => {
  const router = useRouter();
  useEffect(() => {
    const handler = (): void => {
      window.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handler);

    return (): void => {
      router.events.off('routeChangeComplete', handler);
    };
  });
};
