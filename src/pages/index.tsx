import React, { ReactElement } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';
import { Helmet } from 'react-helmet';

import Articles from '../components/Articles';
import Authors from '../components/Authors';
import Page from '../components/Page';
import Tags from '../components/Tags';
import { Article, Author, ID, Tag } from '../types';

export const pageQuery = graphql`
    query IndexPageQuery {
        articles: allArticle(
            sort: { fields: [meta___publishedAt], order: DESC }
        ) {
            nodes {
                description
                meta {
                    id
                    publishedAt
                }
                title
            }
        }
        authors: allAuthor {
            nodes {
                familyName
                givenName
                meta {
                    id
                }
            }
        }
        authorIds: allArticle {
            distinct(field: meta___author___meta___id)
        }
        tags: allArticle {
            distinct(field: meta___tags)
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    tags: {
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    section: {
        '& + &': {
            marginTop: theme.spacing(4),
        },
    },
}));

const IndexPage = ({
    data: {
        articles: { nodes: articles },
        authors: { nodes: authors },
        authorIds: { distinct: distinctAuthorIds },
        tags: { distinct: distinctTags },
    },
}: PageProps<{
    articles: {
        nodes: Partial<Article>[];
    };
    authors: {
        nodes: Author[];
    };
    authorIds: {
        distinct: ID[];
    };
    tags: {
        distinct: Tag[];
    };
}>): ReactElement => {
    const classes = useStyles();

    return (
        <Page>
            <Helmet>
                <meta
                    name="description"
                    content="Articles about frontend development"
                />
            </Helmet>
            <section className={classes.section}>
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
                <Articles articles={articles.slice(0, 8)} />
            </section>
            <section className={classes.section}>
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
                <Tags className={classes.tags} tags={distinctTags} />
            </section>
            <section className={classes.section}>
                <header>
                    <Typography component="h1">
                        <Link
                            color="textPrimary"
                            to="/authors"
                            underline="none"
                            variant="h3"
                        >
                            Authors
                        </Link>
                    </Typography>
                </header>
                <Authors
                    authors={distinctAuthorIds.map((authorId) =>
                        authors.find(({ meta: { id } }) => id === authorId),
                    )}
                />
            </section>
        </Page>
    );
};

export default IndexPage;
