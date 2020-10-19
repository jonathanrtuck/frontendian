import React from 'react';

import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Page from '../components/Page';
import Tags from '../components/Tags';

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

const TagsPage = ({
    data: {
        allContentfulArticle: { distinct: tags },
        site: {
            siteMetadata: { title: siteTitle },
        },
    },
    location,
}) => (
    <Page location={location}>
        <Helmet title={`Tags | ${siteTitle}`} />
        <main>
            <header>
                <h1>Tags</h1>
            </header>
            <Tags tags={tags} />
        </main>
    </Page>
);

export default TagsPage;
