import React, { ReactNode } from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';

import Header from './Header';

type PageProps = {
    children: ReactNode;
    title: string;
};

const Page = ({ children, title }: PageProps) => (
    <>
        <CssBaseline />
        <Container maxWidth="md">
            <Helmet title={title} />
            <Header />
            {children}
        </Container>
    </>
);

export default Page;
