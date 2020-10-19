import React from 'react';

import { Link } from 'gatsby';

import { ArticleNode } from '../types';

type ArticleProps = ArticleNode;

const Article = ({ content, createdAt, tags, title }: ArticleProps) => (
    <article>
        <header>
            <h1>{title}</h1>
            <small>{createdAt}</small>
        </header>
        <div
            dangerouslySetInnerHTML={{
                __html: content.childMarkdownRemark.html,
            }}
        />
        <footer>
            {tags.sort().map((tag) => (
                <Link key={tag} rel="tag" to={`/tags/${tag}`}>
                    {tag}
                </Link>
            ))}
        </footer>
    </article>
);

export default Article;
