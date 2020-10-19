import React from 'react';

import { graphql, PageProps } from 'gatsby';

import Article from '../components/Article';
import Page from '../components/Page';
import { ArticleNode } from '../types';

export const pageQuery = graphql`
    query ArticleTemplateQuery($id: String!) {
        contentfulArticle(contentfulid: { eq: $id }) {
            content {
                childMarkdownRemark {
                    html
                }
            }
            createdAt(formatString: "MMMM Do, YYYY")
            tags
            title
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;

type ArticleTemplateProps = PageProps<{
    contentfulArticle: ArticleNode;
    site: {
        siteMetadata: {
            title: string;
        };
    };
}>;

const ArticleTemplate = ({
    data: {
        contentfulArticle: { content, createdAt, tags, title },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
}: ArticleTemplateProps) => (
    <Page title={`${title} | ${siteTitle}`}>
        <Article
            content={content}
            createdAt={createdAt}
            tags={tags}
            title={title}
        />
    </Page>
);

export default ArticleTemplate;
