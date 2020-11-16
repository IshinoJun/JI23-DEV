import React from 'react';
import { IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

interface Props {
  onClickScrollTopButton: () => void;
  isHidden: boolean;
}
const TopScrollButton: React.FC<Props> = (props) => {
  const { onClickScrollTopButton, isHidden } = props;

  return (
    <IconButton
      onClick={onClickScrollTopButton}
      type="button"
      aria-label="ArrowButton"
      style={{
        position: 'fixed',
        background: '#454b72',
        right: '16px',
        bottom: '16px',
        transform: isHidden ? 'scale(0)' : '',
        transition: 'all .2s ease-in-out',
      }}
    >
      <ArrowUpwardIcon
        style={{
          color: 'fff',
        }}
      />
    </IconButton>
  );
};

export default TopScrollButton;
