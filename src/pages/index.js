import React from 'react';

import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';
import Tags from '../components/Tags';

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

const IndexPage = ({
    data: {
        allContentfulArticle: { distinct: tags, edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    location,
}) => (
    <Page location={location}>
        <Helmet title={siteTitle} />
        <main>
            <section>
                <header>
                    <h1>
                        <Link to="/articles">Articles</Link>
                    </h1>
                </header>
                <Articles articles={articles} />
            </section>
            <section>
                <header>
                    <h1>
                        <Link to="/tags">Tags</Link>
                    </h1>
                </header>
                <Tags tags={tags} />
            </section>
        </main>
    </Page>
);

export default IndexPage;
