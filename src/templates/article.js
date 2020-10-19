import React from 'react';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Page from '../components/Page';

export const pageQuery = graphql`
    query ArticleById($id: String!) {
        contentfulArticle(contentfulid: { eq: $id }) {
            content {
                childMarkdownRemark {
                    html
                }
            }
            createdAt(formatString: "MMMM Do, YYYY")
            title
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;

const Article = ({
    data: {
        contentfulArticle: { content, createdAt, title },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    location,
}) => (
    <Page location={location}>
        <Helmet title={`${title} | ${siteTitle}`} />
        <article>
            <header>
                <h1>{title}</h1>
                <small>{createdAt}</small>
            </header>
            <div
                dangerouslySetInnerHTML={{
                    __html: content.childMarkdownRemark.html,
                }}
            />
        </article>
    </Page>
);

export default Article;
