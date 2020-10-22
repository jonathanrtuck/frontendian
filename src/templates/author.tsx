import React from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { Article, Author } from '../types';
import { getAuthorName } from '../utils';

export const pageQuery = graphql`
    query AuthorTemplateQuery($id: String!) {
        allContentfulArticle(
            filter: { author: { contentfulid: { eq: $id } } }
            sort: { fields: [createdAt], order: DESC }
        ) {
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

const AuthorTemplate = ({
    data: {
        allContentfulArticle: { nodes: articles },
    },
    pageContext: author,
}: PageProps<
    {
        allContentfulArticle: {
            nodes: Partial<Article>[];
        };
    },
    Partial<Author>
>) => {
    const authorName = getAuthorName(author);

    return (
        <Page title={authorName}>
            <Helmet>
                <meta
                    name="description"
                    content={`List of articles by ${authorName}`}
                />
            </Helmet>
            <header>
                <Typography color="textPrimary" component="h1" variant="h3">
                    {authorName}
                </Typography>
            </header>
            <Articles articles={articles} />
        </Page>
    );
};

export default AuthorTemplate;
