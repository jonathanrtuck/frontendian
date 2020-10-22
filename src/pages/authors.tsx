import React from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Authors from '../components/Authors';
import Page from '../components/Page';
import { Author, ID } from '../types';

export const pageQuery = graphql`
    query AuthorsPageQuery {
        allContentfulArticle {
            distinct(field: author___contentfulid)
        }
        allContentfulAuthor {
            nodes {
                familyName
                givenName
                id: contentfulid
            }
        }
    }
`;

const AuthorsPage = ({
    data: {
        allContentfulArticle: { distinct: authorIds },
        allContentfulAuthor: { nodes: authors },
    },
}: PageProps<{
    allContentfulArticle: {
        distinct: ID[];
    };
    allContentfulAuthor: {
        nodes: Author[];
    };
}>) => (
    <Page title="Authors">
        <Helmet>
            <meta name="description" content="List of all authors" />
        </Helmet>
        <header>
            <Typography color="textPrimary" component="h1" variant="h3">
                Authors
            </Typography>
        </header>
        <Authors
            authors={authorIds.map((authorId) =>
                authors.find(({ id }) => id === authorId),
            )}
        />
    </Page>
);

export default AuthorsPage;
