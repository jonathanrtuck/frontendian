import React, { ReactElement } from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { Article, Author } from '../types';
import { getAuthorName } from '../utils';

export const pageQuery = graphql`
    query AuthorTemplateQuery($id: String!) {
        articles: allArticle(
            filter: { meta: { author: { meta: { id: { eq: $id } } } } }
            sort: { fields: [meta___publishedAt], order: DESC }
        ) {
            nodes {
                description
                meta {
                    id
                    publishedAt
                }
                title
            }
        }
        author(meta: { id: { eq: $id } }) {
            familyName
            givenName
            meta {
                id
            }
        }
    }
`;

const AuthorTemplate = ({
    data: {
        articles: { nodes: articles },
        author,
    },
}: PageProps<{
    articles: {
        nodes: Partial<Article>[];
    };
    author: Author;
}>): ReactElement => {
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
