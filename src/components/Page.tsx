import React, { ReactNode } from 'react';

import { Helmet } from 'react-helmet';

import Header from './Header';

import './Page.css';

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
