import React, { ElementType, ReactElement, ReactNode } from 'react';

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
