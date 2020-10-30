import React, { ReactElement } from 'react';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';

import { Article } from '../types';
import { getFormattedDate } from '../utils';

const Articles = ({
    articles,
}: {
    articles: Partial<Article>[];
}): ReactElement => (
    <List>
        {articles.map(({ description, meta: { id, publishedAt }, title }) => (
            <ListItem button component="li" key={id} role="listitem">
                <Link
                    aria-label={title}
                    to={`/articles/${id}`}
                    underline="none"
                >
                    <article>
                        <ListItemText
                            primary={
                                <>
                                    <Typography
                                        color="textPrimary"
                                        component="h2"
                                        variant="h5"
                                    >
                                        {title}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        component="small"
                                        variant="overline"
                                    >
                                        <time dateTime={publishedAt}>
                                            {getFormattedDate(publishedAt)}
                                        </time>
                                    </Typography>
                                </>
                            }
                            primaryTypographyProps={{
                                component: 'header',
                            }}
                            secondary={description}
                        />
                    </article>
                </Link>
            </ListItem>
        ))}
    </List>
);

export default Articles;
