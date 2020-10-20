import React from 'react';

import { Container } from '@material-ui/core';
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
        <Container component="main" maxWidth="md">
            <header>
                <h1>Page Not Found</h1>
            </header>
        </Container>
    </Page>
);

export default NotFoundPage;
