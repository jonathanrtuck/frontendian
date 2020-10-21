import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import Markdown from '../components/Markdown';
import Tags from '../components/Tags';
import { ArticleNode } from '../types';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: theme.spacing(8),
    },
    header: {
        marginBottom: theme.spacing(6),
    },
}));

const Article = ({ content, createdAt, tags, title }: Partial<ArticleNode>) => {
    const classes = useStyles();

    return (
        <>
            <header className={classes.header}>
                <Typography color="textPrimary" component="h1" variant="h3">
                    {title}
                </Typography>
                <Typography
                    color="textSecondary"
                    component="small"
                    variant="subtitle1"
                >
                    {createdAt}
                </Typography>
            </header>
            <Markdown content={content.childMdx.body} />
            <footer className={classes.footer}>
                <Tags tags={tags} />
            </footer>
        </>
    );
};

export default Article;
