import React from 'react';

import { Link } from 'gatsby';

const Tags = ({ tags }) => (
    <div>
        {tags.sort().map((tag) => (
            <Link key={tag} to={`/tags/${tag}`}>
                {tag}
            </Link>
        ))}
    </div>
);

export default Tags;
