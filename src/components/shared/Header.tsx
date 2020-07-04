import React from "react";
import NextLink from "next/link";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MuiLink from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      boxShadow:
        "0 4px 20px 0 rgba(0, 0, 0, 0.1), 0 7px 10px -5px rgba(0, 0, 0, 0.2)",
      background: "#454545",
      color: "#eaeaea",
      "& a": {
        color: "#eaeaea",
      },
    },
    container: {},
    toolbar: {
      padding: "0",
      display: "grid",
      gridTemplate: '"title . nav" auto / auto 1fr auto',
    },
    title: {
      gridArea: "title",
      "& > a": {
        fontSize: "2em",
        fontWeight: 700,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
    accent: {
      color: theme.palette.primary.main,
    },
    small: {
      fontSize: "0.4em",
    },
  })
);

interface Props {
  siteTitle: string;
  siteDescription: string;
  twitterUrl: string;
  githubUrl: string;
  siteTitleComponent: React.ElementType;
}

const Header: React.FC<Props> = ({
  twitterUrl,
  githubUrl,
  siteTitleComponent,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <Typography
            component={siteTitleComponent}
            variant="h4"
            className={classes.title}
            noWrap
          >
            <NextLink href="/" passHref>
              <MuiLink>
                hideyuk<span className={classes.accent}>1</span>
                <span className={classes.small}>.dev</span>
              </MuiLink>
            </NextLink>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
