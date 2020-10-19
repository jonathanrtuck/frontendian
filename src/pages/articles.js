import React from 'react';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';

export const pageQuery = graphql`
    query ArticlesPageQuery {
        allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
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

const ArticlesPage = ({
    data: {
        allContentfulArticle: { edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    location,
}) => (
    <Page location={location}>
        <Helmet title={`Articles | ${siteTitle}`} />
        <main>
            <header>
                <h1>Articles</h1>
            </header>
            <Articles articles={articles} />
        </main>
    </Page>
);

export default ArticlesPage;
