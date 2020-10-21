import React from 'react';

import { Box, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { ArticleEdge } from '../types';

export const pageQuery = graphql`
    query ArticlesPageQuery {
        allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
            edges {
                node {
                    contentfulid
                    createdAt(formatString: "MMMM Do, YYYY")
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

type ArticlesPageProps = PageProps<{
    allContentfulArticle: {
        edges: ArticleEdge[];
    };
}>;

const ArticlesPage = ({
    data: {
        allContentfulArticle: { edges: articles },
    },
}: ArticlesPageProps) => (
    <Page title="Articles">
        <header>
            <Typography color="textPrimary" component="h1" variant="h3">
                Articles
            </Typography>
        </header>
        <Articles articles={articles} />
    </Page>
);

export default ArticlesPage;
