import React from 'react';

import { Chip, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'gatsby-theme-material-ui';

import { Tag } from '../types';

const useStyles = makeStyles((theme) => ({
    tag: {
        display: 'inline-block',

        '& + &': {
            marginLeft: theme.spacing(1),
        },
    },
    tags: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
}));

const Tags = ({ className, tags }: { className?: string; tags: Tag[] }) => {
    const classes = useStyles();

    return (
        <ul className={clsx(className, classes.tags)}>
            {tags.sort().map((tag) => (
                <li className={classes.tag} key={tag}>
                    <Chip
                        clickable
                        component={Link}
                        label={tag}
                        rel="tag"
                        to={`/tags/${tag}`}
                        underline="none"
                    />
                </li>
            ))}
        </ul>
    );
};

export default Tags;
