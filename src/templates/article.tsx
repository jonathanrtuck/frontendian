import React, { ReactElement } from 'react';

import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Article from '../components/Article';
import Page from '../components/Page';
import { Article as ArticleType } from '../types';

export const pageQuery = graphql`
    query ArticleTemplateQuery($id: String!) {
        article(meta: { id: { eq: $id } }) {
            content
            description
            meta {
                author {
                    familyName
                    givenName
                    meta {
                        id
                    }
                }
                id
                publishedAt
                updatedAt
                tags
            }
            title
        }
    }
`;

const ArticleTemplate = ({
    data: { article },
}: PageProps<{
    article: Partial<ArticleType>;
}>): ReactElement => (
    <Page component="article" title={article.title}>
        <Helmet>
            <meta name="description" content={article.description} />
        </Helmet>
        <Article {...article} />
    </Page>
);

export default ArticleTemplate;
