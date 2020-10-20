import React, { ReactNode } from 'react';

import { Helmet } from 'react-helmet';

import Header from './Header';

type PageProps = {
    children: ReactNode;
    title: string;
};

const Page = ({ children, title }: PageProps) => (
    <>
        <Helmet title={title} />
        <Header />
        {children}
    </>
);

export default Page;
