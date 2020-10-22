import React from 'react';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';

import { Author } from '../types';
import { getAuthorName } from '../utils';

const Authors = ({ authors }: { authors: Partial<Author>[] }) => (
    <List>
        {authors.map((author) => {
            const authorName = getAuthorName(author);

            return (
                <ListItem button component="li" key={author.id} role="listitem">
                    <Link
                        aria-label={authorName}
                        to={`/authors/${author.id}`}
                        underline="none"
                    >
                        <article>
                            <ListItemText
                                primary={authorName}
                                primaryTypographyProps={{
                                    color: 'textPrimary',
                                }}
                            />
                        </article>
                    </Link>
                </ListItem>
            );
        })}
    </List>
);

export default Authors;
