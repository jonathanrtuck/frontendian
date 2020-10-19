import React from 'react';

import { graphql, PageProps } from 'gatsby';

import Page from '../components/Page';

export const pageQuery = graphql`
    query NotFoundPageQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

type NotFoundPageProps = PageProps<{
    site: {
        siteMetadata: {
            title: string;
        };
    };
}>;

const NotFoundPage = ({
    data: {
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
}: NotFoundPageProps) => (
    <Page title={`Not Found | ${siteTitle}`}>
        <main>
            <header>
                <h1>Page Not Found</h1>
            </header>
        </main>
    </Page>
);

export default NotFoundPage;
