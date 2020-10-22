import React from 'react';

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
        allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
            nodes {
                createdAt
                description {
                    description
                }
                id: contentfulid
                title
            }
        }
        allContentfulAuthor {
            nodes {
                familyName
                givenName
                id: contentfulid
            }
        }
        authors: allContentfulArticle {
            distinct(field: author___contentfulid)
        }
        tags: allContentfulArticle {
            distinct(field: tags)
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
        allContentfulArticle: { nodes: articles },
        allContentfulAuthor: { nodes: authors },
        authors: { distinct: distinctAuthors },
        tags: { distinct: distinctTags },
    },
}: PageProps<{
    allContentfulArticle: {
        nodes: Partial<Article>[];
    };
    allContentfulAuthor: {
        nodes: Partial<Author>[];
    };
    authors: {
        distinct: ID[];
    };
    tags: {
        distinct: Tag[];
    };
}>) => {
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
                    authors={distinctAuthors.map((authorId) =>
                        authors.find(({ id }) => id === authorId),
                    )}
                />
            </section>
        </Page>
    );
};

export default IndexPage;
