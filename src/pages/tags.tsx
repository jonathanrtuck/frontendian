import React from 'react';

import { graphql, PageProps } from 'gatsby';

import Page from '../components/Page';
import Tags from '../components/Tags';
import { Tag } from '../types';

export const pageQuery = graphql`
    query TagsPageQuery {
        allContentfulArticle {
            distinct(field: tags)
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;

type TagsPageProps = PageProps<{
    allContentfulArticle: {
        distinct: Tag[];
    };
    site: {
        siteMetadata: {
            title: string;
        };
    };
}>;

const TagsPage = ({
    data: {
        allContentfulArticle: { distinct: tags },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
}: TagsPageProps) => (
    <Page title={`Tags | ${siteTitle}`}>
        <main>
            <header>
                <h1>Tags</h1>
            </header>
            <Tags tags={tags} />
        </main>
    </Page>
);

export default TagsPage;
