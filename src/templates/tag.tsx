import React from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

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

const TagTemplate = ({
    data: {
        allContentfulArticle: { edges: articles },
    },
    pageContext: { tag },
}: PageProps<
    {
        allContentfulArticle: {
            edges: ArticleEdge[];
        };
    },
    {
        tag: string;
    }
>) => (
    <Page title={tag}>
        <Helmet>
            <meta
                name="description"
                content={`List of articles tagged with ${tag}`}
            />
        </Helmet>
        <header>
            <Typography color="textPrimary" component="h1" variant="h3">
                {tag}
            </Typography>
        </header>
        <Articles articles={articles} />
    </Page>
);

export default TagTemplate;
