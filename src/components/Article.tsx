import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';

import Markdown from '../components/Markdown';
import Tags from '../components/Tags';
import { Article as ArticleType } from '../types';
import { getFormattedDate } from '../utils';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: theme.spacing(8),
    },
    header: {
        marginBottom: theme.spacing(6),
    },
    metadata: {},
    metadata__key: {
        display: 'inline',

        '&::after': {
            content: '""',
            paddingRight: '.25em',
        },

        '& ~ &': {
            '&::before': {
                content: "'\\A'",
                whiteSpace: 'pre',
            },
        },
    },
    metadata__value: {
        display: 'inline',
    },
}));

const Article = ({
    author,
    content,
    createdAt,
    tags,
    title,
    updatedAt,
}: Partial<ArticleType>) => {
    const classes = useStyles();

    return (
        <>
            <header className={classes.header}>
                <Typography color="textPrimary" component="h1" variant="h3">
                    {title}
                </Typography>
                <dl className={classes.metadata}>
                    <Typography
                        className={classes.metadata__key}
                        color="textSecondary"
                        component="dt"
                        variant="srOnly"
                    >
                        Published on
                    </Typography>
                    <Typography
                        className={classes.metadata__value}
                        color="textSecondary"
                        component="dd"
                        variant="subtitle1"
                    >
                        <time dateTime={createdAt}>
                            {getFormattedDate(createdAt)}
                        </time>
                    </Typography>
                    {updatedAt && (
                        <>
                            <Typography
                                className={classes.metadata__key}
                                color="textSecondary"
                                component="dt"
                                variant="subtitle2"
                            >
                                Updated on
                            </Typography>
                            <Typography
                                className={classes.metadata__value}
                                color="textSecondary"
                                component="dd"
                                variant="subtitle2"
                            >
                                <time dateTime={updatedAt}>
                                    {getFormattedDate(updatedAt)}
                                </time>
                            </Typography>
                        </>
                    )}
                    <Typography
                        className={classes.metadata__key}
                        color="textSecondary"
                        component="dt"
                        variant="subtitle1"
                    >
                        By
                    </Typography>
                    <Typography
                        className={classes.metadata__value}
                        color="textSecondary"
                        component="dd"
                        variant="subtitle1"
                    >
                        <Link
                            color="inherit"
                            rel="author"
                            to={`/authors/${author.id}`}
                        >
                            {`${author.givenName} ${author.familyName}`}
                        </Link>
                    </Typography>
                </dl>
            </header>
            <Markdown content={content.childMdx.body} />
            <footer className={classes.footer}>
                <Tags tags={tags} />
            </footer>
        </>
    );
};

export default Article;
