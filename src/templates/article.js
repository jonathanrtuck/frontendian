import React from 'react';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Article from '../components/Article';
import Page from '../components/Page';

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

const ArticleTemplate = ({
    data: {
        contentfulArticle: { content, createdAt, tags, title },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    location,
}) => (
    <Page location={location}>
        <Helmet title={`${title} | ${siteTitle}`} />
        <Article
            content={content}
            createdAt={createdAt}
            tags={tags}
            title={title}
        />
    </Page>
);

export default ArticleTemplate;
