import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRouterScroll = (): void => {
  const router = useRouter();
  useEffect(() => {
    const handler = () => {
      window.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handler);

    return () => {
      router.events.off('routerChangeComplete', handler);
    };
  });
};

export default useRouterScroll;
