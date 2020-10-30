import React, { ReactElement } from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Authors from '../components/Authors';
import Page from '../components/Page';
import { Author, ID } from '../types';

export const pageQuery = graphql`
    query AuthorsPageQuery {
        authorIds: allArticle {
            distinct(field: meta___author___meta___id)
        }
        authors: allAuthor {
            nodes {
                familyName
                givenName
                meta {
                    id
                }
            }
        }
    }
`;

const AuthorsPage = ({
    data: {
        authorIds: { distinct: authorIds },
        authors: { nodes: authors },
    },
}: PageProps<{
    authorIds: {
        distinct: ID[];
    };
    authors: {
        nodes: Author[];
    };
}>): ReactElement => (
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
                authors.find(({ meta: { id } }) => id === authorId),
            )}
        />
    </Page>
);

export default AuthorsPage;
