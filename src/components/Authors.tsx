import React from 'react';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';

import { Author } from '../types';

const Authors = ({ authors }: { authors: Partial<Author>[] }) => (
    <List>
        {authors.map(({ familyName, givenName, id }) => {
            const authorName = `${givenName} ${familyName}`;

            return (
                <ListItem button component="li" key={id} role="listitem">
                    <Link
                        aria-label={authorName}
                        to={`/authors/${id}`}
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
