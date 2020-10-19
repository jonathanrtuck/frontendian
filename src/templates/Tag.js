import React from 'react';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Page from '../components/Page';

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
        site {
            siteMetadata {
                title
            }
        }
    }
`;

const TagTemplate = ({
    data: {
        allContentfulArticle: { edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    location,
    pageContext: { tag },
}) => (
    <Page location={location}>
        <Helmet title={`${tag} | ${siteTitle}`} />
        <main>
            <header>
                <h1>{tag}</h1>
            </header>
            <Articles articles={articles} />
        </main>
    </Page>
);

export default TagTemplate;
