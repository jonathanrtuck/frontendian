import React from 'react';

import { Box } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';

import Article from '../components/Article';
import Page from '../components/Page';
import { ArticleNode } from '../types';

export const pageQuery = graphql`
    query ArticleTemplateQuery($id: String!) {
        contentfulArticle(contentfulid: { eq: $id }) {
            content {
                childMdx {
                    body
                }
            }
            createdAt(formatString: "MMMM Do, YYYY")
            tags
            title
        }
    }
`;

type ArticleTemplateProps = PageProps<{
    contentfulArticle: ArticleNode;
}>;

const ArticleTemplate = ({
    data: {
        contentfulArticle: { content, createdAt, tags, title },
    },
}: ArticleTemplateProps) => (
    <Page component="article" title={title}>
        <Article
            content={content}
            createdAt={createdAt}
            tags={tags}
            title={title}
        />
    </Page>
);

export default ArticleTemplate;
