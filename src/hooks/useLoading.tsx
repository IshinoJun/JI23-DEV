import * as React from 'react';

/**
 * Loadingの状態を管理するカスタムフック
 * @param initValue 初期値
 */
export const useLoading = (
  initValue: boolean,
): {
  isLoading: boolean;
  doLoading: () => void;
  doHidden: () => void;
} => {
  const [isLoading, setIsLoading] = React.useState(initValue);

  const doLoading = React.useCallback(() => {
    setIsLoading(true);
  }, []);

  const doHidden = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    doLoading,
    doHidden,
  };
};
