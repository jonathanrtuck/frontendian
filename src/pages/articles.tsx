import React from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { Article } from '../types';

export const pageQuery = graphql`
    query ArticlesPageQuery {
        allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
            nodes {
                createdAt
                description {
                    description
                }
                id: contentfulid
                title
            }
        }
    }
`;

const ArticlesPage = ({
    data: {
        allContentfulArticle: { nodes: articles },
    },
}: PageProps<{
    allContentfulArticle: {
        nodes: Partial<Article>[];
    };
}>) => (
    <Page title="Articles">
        <Helmet>
            <meta name="description" content="List of all articles" />
        </Helmet>
        <header>
            <Typography color="textPrimary" component="h1" variant="h3">
                Articles
            </Typography>
        </header>
        <Articles articles={articles} />
    </Page>
);

export default ArticlesPage;
