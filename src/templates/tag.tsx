import React, { ReactElement } from 'react';

import { Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { Article } from '../types';

export const pageQuery = graphql`
    query TagTemplateQuery($tag: String!) {
        allArticle(
            filter: { meta: { tags: { eq: $tag } } }
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
    }
`;

const TagTemplate = ({
    data: {
        allArticle: { nodes: articles },
    },
    pageContext: { tag },
}: PageProps<
    {
        allArticle: {
            nodes: Article[];
        };
    },
    {
        tag: string;
    }
>): ReactElement => (
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
