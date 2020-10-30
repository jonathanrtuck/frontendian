import React, { ReactElement } from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';

import { Author } from '../types';
import { getAuthorName } from '../utils';

const Authors = ({ authors }: { authors: Author[] }): ReactElement => (
    <List>
        {authors.map((author) => {
            const {
                meta: { id },
            } = author;
            const authorName = getAuthorName(author);

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
