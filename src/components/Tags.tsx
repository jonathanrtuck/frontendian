import React from 'react';

import { Link } from 'gatsby';

import { Tag } from '../types';

type TagsProps = {
    tags: Tag[];
};

const Tags = ({ tags }: TagsProps) => (
    <div>
        {tags.sort().map((tag) => (
            <Link key={tag} to={`/tags/${tag}`}>
                {tag}
            </Link>
        ))}
    </div>
);

export default Tags;
