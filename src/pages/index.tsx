import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';

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
    }
`;

const useStyles = makeStyles((theme) => ({
    tags: {
        marginTop: theme.spacing(2),
    },
    tagsSection: {
        marginTop: theme.spacing(4),
    },
}));

type IndexPageProps = PageProps<{
    allContentfulArticle: {
        distinct: Tag[];
        edges: ArticleEdge[];
    };
}>;

const IndexPage = ({
    data: {
        allContentfulArticle: { distinct: tags, edges: articles },
    },
}: IndexPageProps) => {
    const classes = useStyles();

    return (
        <Page>
            <section>
                <header>
                    <Typography component="h1">
                        <Link
                            color="textPrimary"
                            to="/articles"
                            underline="none"
                            variant="h3"
                        >
                            Articles
                        </Link>
                    </Typography>
                </header>
                <Articles articles={articles} />
            </section>
            <section className={classes.tagsSection}>
                <header>
                    <Typography component="h1">
                        <Link
                            color="textPrimary"
                            to="/tags"
                            underline="none"
                            variant="h3"
                        >
                            Tags
                        </Link>
                    </Typography>
                </header>
                <Tags className={classes.tags} tags={tags} />
            </section>
        </Page>
    );
};

export default IndexPage;
