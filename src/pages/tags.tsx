import React from 'react';

import { Box, Container, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';

import Page from '../components/Page';
import Tags from '../components/Tags';
import { Tag } from '../types';

export const pageQuery = graphql`
    query TagsPageQuery {
        allContentfulArticle {
            distinct(field: tags)
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;

type TagsPageProps = PageProps<{
    allContentfulArticle: {
        distinct: Tag[];
    };
    site: {
        siteMetadata: {
            title: string;
        };
    };
}>;

const TagsPage = ({
    data: {
        allContentfulArticle: { distinct: tags },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
}: TagsPageProps) => (
    <Page title={`Tags | ${siteTitle}`}>
        <Container component="main" maxWidth="md">
            <Box marginY={4}>
                <header>
                    <Typography color="textPrimary" component="h1" variant="h3">
                        Tags
                    </Typography>
                </header>
                <Tags tags={tags} />
            </Box>
        </Container>
    </Page>
);

export default TagsPage;
