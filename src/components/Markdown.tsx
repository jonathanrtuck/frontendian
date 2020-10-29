import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { Link as LinkIcon, OpenInNewOutlined } from '@material-ui/icons';
import { MDXProvider } from '@mdx-js/react';
import { paramCase } from 'change-case';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby-theme-material-ui';

const useStyles = makeStyles((theme) => ({
    heading: {
        '&:hover $headingLink': {
            display: 'inline-block',
        },
    },
    heading__icon: {
        verticalAlign: 'middle',
    },
    heading__link: {
        color: 'inherit',
        display: 'none',
        marginLeft: theme.spacing(1),
    },
    link: {},
    link__icon: {
        fontSize: '.75em',
        marginLeft: '.1em',
        verticalAlign: 'top',
    },
}));

/**
 * @see https://mdxjs.com/table-of-components
 */
const Markdown = ({ content }: { content: string }) => {
    const classes = useStyles();

    return (
        <MDXProvider
            components={{
                // @todo determine if external link
                a: ({ children, href }) => {
                    if (href.startsWith('/')) {
                        return (
                            <Typography
                                className={classes.link}
                                color="textPrimary"
                                component={Link}
                                rel="internal"
                                to={href}
                                underline="always"
                                variant="inherit"
                            >
                                {children}
                            </Typography>
                        );
                    }

                    return (
                        <Typography
                            className={classes.link}
                            color="textPrimary"
                            component="a"
                            href={href}
                            rel="external"
                            variant="inherit"
                        >
                            {children}
                            <OpenInNewOutlined className={classes.link__icon} />
                        </Typography>
                    );
                },
                // blockquote
                // code
                h2: ({ children }) => {
                    const id = paramCase(children);

                    return (
                        <Typography
                            className={classes.heading}
                            color="textPrimary"
                            component="h2"
                            gutterBottom
                            id={id}
                            variant="h4"
                        >
                            {children}
                            <a
                                className={classes.heading__link}
                                href={`#${id}`}
                            >
                                <LinkIcon className={classes.heading__icon} />
                            </a>
                        </Typography>
                    );
                },
                h3: ({ children }) => {
                    const id = paramCase(children);

                    return (
                        <Typography
                            className={classes.heading}
                            color="textPrimary"
                            component="h3"
                            gutterBottom
                            id={id}
                            variant="h5"
                        >
                            {children}
                            <a
                                className={classes.heading__link}
                                href={`#${id}`}
                            >
                                <Link className={classes.heading__icon} />
                            </a>
                        </Typography>
                    );
                },
                h4: ({ children }) => {
                    const id = paramCase(children);

                    return (
                        <Typography
                            className={classes.heading}
                            color="textPrimary"
                            component="h4"
                            gutterBottom
                            id={id}
                            variant="h6"
                        >
                            {children}
                            <a
                                className={classes.heading__link}
                                href={`#${id}`}
                            >
                                <Link className={classes.heading__icon} />
                            </a>
                        </Typography>
                    );
                },
                // hr
                // inlineCode
                li: ({ children }) => (
                    <Typography
                        color="textPrimary"
                        component="li"
                        variant="body1"
                    >
                        {children}
                    </Typography>
                ),
                p: ({ children }) => (
                    <Typography
                        color="textPrimary"
                        component="p"
                        paragraph
                        variant="body1"
                    >
                        {children}
                    </Typography>
                ),
                // pre - background - card, grey, no shadow
            }}
        >
            <MDXRenderer>{content}</MDXRenderer>
        </MDXProvider>
    );
};

export default Markdown;
