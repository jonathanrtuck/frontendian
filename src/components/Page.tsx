import React, { ElementType, ReactElement, ReactNode } from 'react';

import { Container, makeStyles, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { useSiteTitle } from '../hooks/useSiteTitle';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(4),
    },
    skipLink: {
        backgroundColor: '#fff',
        left: '50%',
        padding: theme.spacing(1),
        position: 'absolute',
        top: 0,
        transform: 'translate(-50%, -100%)',
        zIndex: 1101,
        '&:focus': {
            transform: 'translate(-50%, 0)',
        },
    },
}));

const Page = ({
    children,
    component = 'main',
    title,
}: {
    children: ReactNode;
    component?: ElementType;
    title?: string;
}): ReactElement => {
    const classes = useStyles();
    const siteTitle = useSiteTitle();

    return (
        <>
            <Helmet
                htmlAttributes={{
                    lang: 'en',
                }}
                title={title ? `${title} ・ ${siteTitle}` : siteTitle}
            />
            <Typography
                className={classes.skipLink}
                color="textPrimary"
                component="a"
                href="#main"
                variant="caption"
            >
                Skip to main content
            </Typography>
            <Header />
            <Container
                className={classes.container}
                component={component}
                id="main"
                maxWidth="sm"
            >
                {children}
            </Container>
        </>
    );
};

export default Page;
