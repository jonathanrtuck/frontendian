import React from 'react';

import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Article from '../components/Article';
import Page from '../components/Page';
import { ArticleNode } from '../types';

export const pageQuery = graphql`
    query ArticleTemplateQuery($id: String!) {
        contentfulArticle(contentfulid: { eq: $id }) {
            content {
                childMdx {
                    body
                }
            }
            createdAt(formatString: "MMMM Do, YYYY")
            description {
                description
            }
            tags
            title
        }
    }
`;

type ArticleTemplateProps = PageProps<{
    contentfulArticle: ArticleNode;
}>;

const ArticleTemplate = ({
    data: {
        contentfulArticle: { content, createdAt, description, tags, title },
    },
}: ArticleTemplateProps) => (
    <Page component="article" title={title}>
        <Helmet>
            <meta name="description" content={description.description} />
        </Helmet>
        <Article
            content={content}
            createdAt={createdAt}
            description={description}
            tags={tags}
            title={title}
        />
    </Page>
);

export default ArticleTemplate;
