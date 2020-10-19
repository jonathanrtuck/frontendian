import React from 'react';

import { graphql, PageProps } from 'gatsby';

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

type TagTemplateProps = PageProps<
    {
        allContentfulArticle: {
            edges: ArticleEdge[];
        };
        site: {
            siteMetadata: {
                title: string;
            };
        };
    },
    {
        tag: string;
    }
>;

const TagTemplate = ({
    data: {
        allContentfulArticle: { edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    pageContext: { tag },
}: TagTemplateProps) => (
    <Page title={`${tag} | ${siteTitle}`}>
        <main>
            <header>
                <h1>{tag}</h1>
            </header>
            <Articles articles={articles} />
        </main>
    </Page>
);

export default TagTemplate;
