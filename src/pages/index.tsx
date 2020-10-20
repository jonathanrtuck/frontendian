import React from 'react';

import { Box, Container, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';

import Articles from '../components/Articles';
import Page from '../components/Page';
import Tags from '../components/Tags';
import { ArticleEdge, Tag } from '../types';

export const pageQuery = graphql`
    query IndexPageQuery {
        allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
            distinct(field: tags)
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

type IndexPageProps = PageProps<{
    allContentfulArticle: {
        distinct: Tag[];
        edges: ArticleEdge[];
    };
    site: {
        siteMetadata: {
            title: string;
        };
    };
}>;

const IndexPage = ({
    data: {
        allContentfulArticle: { distinct: tags, edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
}: IndexPageProps) => (
    <Page title={siteTitle}>
        <Container component="main" maxWidth="md">
            <Box component="section" marginY={4}>
                <header>
                    <Typography component="h1">
                        <Link
                            color="textPrimary"
                            to="/articles"
                            underline="none"
                            variant="h3"
                        >
                            Articles
                        </Link>
                    </Typography>
                </header>
                <Articles articles={articles} />
            </Box>
            <Box component="section" marginY={4}>
                <header>
                    <Typography component="h1">
                        <Link
                            color="textPrimary"
                            to="/tags"
                            underline="none"
                            variant="h3"
                        >
                            Tags
                        </Link>
                    </Typography>
                </header>
                <Tags tags={tags} />
            </Box>
        </Container>
    </Page>
);

export default IndexPage;
