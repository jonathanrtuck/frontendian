import React from 'react';

import { Box, Container, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { ArticleEdge } from '../types';

export const pageQuery = graphql`
    query TagTemplateQuery($tag: String!) {
        allContentfulArticle(
            filter: { tags: { eq: $tag } }
            sort: { fields: [createdAt], order: DESC }
        ) {
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
        site {
            siteMetadata {
                title
            }
        }
    }
`;

type TagTemplateProps = PageProps<
    {
        allContentfulArticle: {
            edges: ArticleEdge[];
        };
        site: {
            siteMetadata: {
                title: string;
            };
        };
    },
    {
        tag: string;
    }
>;

const TagTemplate = ({
    data: {
        allContentfulArticle: { edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    pageContext: { tag },
}: TagTemplateProps) => (
    <Page title={`${tag} | ${siteTitle}`}>
        <Container component="main" maxWidth="md">
            <Box marginY={4}>
                <header>
                    <Typography color="textPrimary" component="h1" variant="h3">
                        {tag}
                    </Typography>
                </header>
                <Articles articles={articles} />
            </Box>
        </Container>
    </Page>
);

export default TagTemplate;
