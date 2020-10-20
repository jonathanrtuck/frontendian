import React from 'react';

import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Link } from 'gatsby-theme-material-ui';

const useStyles = makeStyles({
    appBar: {
        backgroundColor: grey[700],
    },
    heading: {
        color: '#fff',
        fontWeight: 300,
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar>
                <Typography component="h1">
                    <Link
                        className={classes.heading}
                        to="/"
                        underline="none"
                        variant="h4"
                    >
                        frontendian
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
