import React from 'react';

import { Box, Chip, makeStyles } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';

import { Tag } from '../types';

const useStyles = makeStyles((theme) => ({
    tag: {
        '& + &': {
            marginLeft: theme.spacing(1),
        },
    },
}));

type TagsProps = {
    tags: Tag[];
};

const Tags = ({ tags }: TagsProps) => {
    const classes = useStyles();

    return (
        <Box marginY={2}>
            {tags.sort().map((tag) => (
                <Chip
                    className={classes.tag}
                    clickable
                    component={Link}
                    key={tag}
                    label={tag}
                    rel="tag"
                    to={`/tags/${tag}`}
                    underline="none"
                />
            ))}
        </Box>
    );
};

export default Tags;
