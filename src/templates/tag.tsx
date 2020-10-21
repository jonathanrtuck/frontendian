import React from 'react';

import { Box, Typography } from '@material-ui/core';
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
    }
`;

type TagTemplateProps = PageProps<
    {
        allContentfulArticle: {
            edges: ArticleEdge[];
        };
    },
    {
        tag: string;
    }
>;

const TagTemplate = ({
    data: {
        allContentfulArticle: { edges: articles },
    },
    pageContext: { tag },
}: TagTemplateProps) => (
    <Page title={tag}>
        <header>
            <Typography color="textPrimary" component="h1" variant="h3">
                {tag}
            </Typography>
        </header>
        <Articles articles={articles} />
    </Page>
);

export default TagTemplate;
