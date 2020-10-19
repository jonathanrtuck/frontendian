import React from 'react';

import Header from './Header';

import './Page.css';

const Page = ({ children }) => (
    <>
        <Header />
        {children}
    </>
);

export default Page;
