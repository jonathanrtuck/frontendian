import React from 'react';

import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Article from '../components/Article';
import Page from '../components/Page';
import { Article as ArticleType } from '../types';

export const pageQuery = graphql`
    query ArticleTemplateQuery($id: String!) {
        contentfulArticle(contentfulid: { eq: $id }) {
            author {
                email
                familyName
                givenName
                id: contentfulid
            }
            content {
                childMdx {
                    body
                }
            }
            createdAt
            description {
                description
            }
            tags
            title
            updatedAt
        }
    }
`;

const ArticleTemplate = ({
    data: {
        contentfulArticle: {
            author,
            content,
            createdAt,
            description,
            tags,
            title,
            updatedAt,
        },
    },
}: PageProps<{
    contentfulArticle: Partial<ArticleType>;
}>) => (
    <Page component="article" title={title}>
        <Helmet>
            <meta name="description" content={description.description} />
        </Helmet>
        <Article
            author={author}
            content={content}
            createdAt={createdAt}
            description={description}
            tags={tags}
            title={title}
            updatedAt={updatedAt}
        />
    </Page>
);

export default ArticleTemplate;
