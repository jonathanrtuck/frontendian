import React from 'react';

import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Page from '../components/Page';

export const pageQuery = graphql`
    query HomeQuery {
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

const Index = ({
    data: {
        allContentfulArticle: { edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    location,
}) => (
    <Page location={location}>
        <Helmet title={siteTitle} />
        <main>
            <h1>Articles</h1>
            {articles.map(
                ({
                    node: {
                        contentfulid,
                        createdAt,
                        description: { description },
                        title,
                    },
                }) => (
                    <article key={contentfulid}>
                        <header>
                            <h2>
                                <Link to={contentfulid}>{title}</Link>
                            </h2>
                            <small>{createdAt}</small>
                        </header>
                        <p>{description}</p>
                    </article>
                ),
            )}
        </main>
    </Page>
);

export default Index;
