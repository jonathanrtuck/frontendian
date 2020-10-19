import React from 'react';

import { graphql, PageProps } from 'gatsby';

import Articles from '../components/Articles';
import Page from '../components/Page';
import { ArticleEdge } from '../types';

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

type ArticlesPageProps = PageProps<{
    allContentfulArticle: {
        edges: ArticleEdge[];
    };
    site: {
        siteMetadata: {
            title: string;
        };
    };
}>;

const ArticlesPage = ({
    data: {
        allContentfulArticle: { edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
}: ArticlesPageProps) => (
    <Page title={`Articles | ${siteTitle}`}>
        <main>
            <header>
                <h1>Articles</h1>
            </header>
            <Articles articles={articles} />
        </main>
    </Page>
);

export default ArticlesPage;
