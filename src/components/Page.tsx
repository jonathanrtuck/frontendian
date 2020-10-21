import React, { ElementType, ReactNode } from 'react';

import { Container, makeStyles } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { useSiteTitle } from '../hooks/useSiteTitle';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(4),
    },
}));

type PageProps = {
    children: ReactNode;
    component?: ElementType;
    title?: string;
};

const Page = ({ children, component = 'main', title }: PageProps) => {
    const classes = useStyles();
    const siteTitle = useSiteTitle();

    return (
        <>
            <Helmet title={title ? `${title} ・ ${siteTitle}` : siteTitle} />
            <Header />
            <Container
                className={classes.container}
                component={component}
                maxWidth="sm"
            >
                {children}
            </Container>
        </>
    );
};

export default Page;
