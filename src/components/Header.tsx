import React from 'react';

import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { GitHub } from '@material-ui/icons';
import { Link } from 'gatsby-theme-material-ui';

const useStyles = makeStyles({
    appBar: {
        backgroundColor: grey[700],
    },
    heading: {
        flexGrow: 1,
    },
    headingLink: {
        color: '#fff',
        fontWeight: 300,
    },
    link: {
        color: '#fff',
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar>
                <Typography className={classes.heading} component="h1">
                    <Link
                        className={classes.headingLink}
                        to="/"
                        underline="none"
                        variant="h4"
                    >
                        frontendian
                    </Link>
                </Typography>
                <a
                    aria-label=""
                    className={classes.link}
                    href="https://github.com/jonathanrtuck/frontendian"
                    rel="external"
                >
                    <Typography variant="srOnly">
                        Source code on github
                    </Typography>
                    <GitHub />
                </a>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
