import React from 'react';

import { Box, Typography } from '@material-ui/core';

import Tags from '../components/Tags';
import { ArticleNode } from '../types';

type ArticleProps = ArticleNode;

const Article = ({ content, createdAt, tags, title }: ArticleProps) => (
    <>
        <Box component="header" marginBottom={6}>
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
        </Box>
        <div
            dangerouslySetInnerHTML={{
                __html: content.childMarkdownRemark.html,
            }}
        />
        <Box component="footer" marginTop={8}>
            <Tags tags={tags} />
        </Box>
    </>
);

export default Article;
