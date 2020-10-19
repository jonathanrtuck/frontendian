import React from 'react';

import { Link } from 'gatsby';

const Articles = ({ articles }) => (
    <div>
        {articles.map(
            ({
                node: {
                    contentfulid: id,
                    createdAt,
                    description: { description },
                    title,
                },
            }) => (
                <article key={id}>
                    <header>
                        <h2>
                            <Link to={`/articles/${id}`}>{title}</Link>
                        </h2>
                        <small>{createdAt}</small>
                    </header>
                    <p>{description}</p>
                </article>
            ),
        )}
    </div>
);

export default Articles;
