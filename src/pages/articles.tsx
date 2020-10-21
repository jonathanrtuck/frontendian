import React from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { ArticleEdge } from '../types';

export const pageQuery = graphql`
    query ArticlesPageQuery {
        allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
            edges {
                node {
                    contentfulid
                    createdAt(formatString: "LL", locale: "en-US")
                    description {
                        description
                    }
                    tags
                    title
                }
            }
        }
    }
`;

const ArticlesPage = ({
    data: {
        allContentfulArticle: { edges: articles },
    },
}: PageProps<{
    allContentfulArticle: {
        edges: ArticleEdge[];
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
