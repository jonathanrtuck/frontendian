import React from 'react';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';

import { ArticleEdge } from '../types';

const Articles = ({ articles }: { articles: ArticleEdge[] }) => (
    <List>
        {articles.map(
            ({
                node: {
                    contentfulid: id,
                    createdAt,
                    description: { description },
                    title,
                },
            }) => (
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
                                            {createdAt}
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
            ),
        )}
    </List>
);

export default Articles;
