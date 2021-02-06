import React from 'react';
import Link from 'next/link';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import style from './HeaderDrawer.module.scss';
import GlobalNav from '../../models/GlobalNav';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    textTransform: 'uppercase',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

interface Props {
  isOpen: boolean;
  onClickDrawer: () => void;
  globalNav: GlobalNav[];
}

const HeaderDrawer: React.FC<Props> = (props) => {
  const { isOpen, onClickDrawer, globalNav } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      anchor="right"
      open={isOpen}
      onClose={onClickDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClickDrawer} aria-label="ChevronIcon">
          {theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {globalNav.map((nav) => (
          <ListItem button key={nav.title} onClick={onClickDrawer}>
            <div className={style.icon}>
              <img {...nav.imgProps} alt="ヘッダー画像" />
            </div>
            <Link href={nav.linkProps.href}>
              <ListItemText primary={nav.title} className={classes.title} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default HeaderDrawer;
