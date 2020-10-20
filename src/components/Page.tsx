import React, { ReactNode } from 'react';

import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';

import Header from './Header';

type PageProps = {
    children: ReactNode;
    title: string;
};

const Page = ({ children, title }: PageProps) => (
    <Container maxWidth="md">
        <Helmet title={title} />
        <Header />
        {children}
    </Container>
);

export default Page;
