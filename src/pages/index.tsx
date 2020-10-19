import React from 'react';

import { graphql, Link, PageProps } from 'gatsby';

import Articles from '../components/Articles';
import Page from '../components/Page';
import Tags from '../components/Tags';
import { ArticleEdge, Tag } from '../types';

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

type IndexPageProps = PageProps<{
    allContentfulArticle: {
        distinct: Tag[];
        edges: ArticleEdge[];
    };
    site: {
        siteMetadata: {
            title: string;
        };
    };
}>;

const IndexPage = ({
    data: {
        allContentfulArticle: { distinct: tags, edges: articles },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
}: IndexPageProps) => (
    <Page title={siteTitle}>
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
