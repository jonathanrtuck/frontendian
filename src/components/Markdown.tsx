import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { Link, OpenInNewOutlined } from '@material-ui/icons';
import { MDXProvider } from '@mdx-js/react';
import { paramCase } from 'change-case';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const useStyles = makeStyles({
    aIcon: {
        fontSize: '.75em',
        marginLeft: '.1em',
        verticalAlign: 'top',
    },
    headingIcon: {
        verticalAlign: 'middle',
    },
    headingLink: {
        color: 'inherit',
    },
});

type MdxProps = {
    content: string;
};

const Markdown = ({ content }: MdxProps) => {
    const classes = useStyles();

    return (
        <MDXProvider
            components={{
                // @todo determine if external link
                a: ({ children, href }) => (
                    <Typography
                        color="textPrimary"
                        component="a"
                        href={href}
                        rel="external"
                        variant="inherit"
                    >
                        {children}
                        <OpenInNewOutlined className={classes.aIcon} />
                    </Typography>
                ),
                h2: ({ children }) => {
                    const id = paramCase(children);

                    return (
                        <Typography
                            color="textPrimary"
                            component="h2"
                            gutterBottom
                            id={id}
                            variant="h4"
                        >
                            {children}
                            <a className={classes.headingLink} href={`#${id}`}>
                                <Link className={classes.headingIcon} />
                            </a>
                        </Typography>
                    );
                },
                h3: ({ children }) => {
                    const id = paramCase(children);

                    return (
                        <Typography
                            color="textPrimary"
                            component="h3"
                            gutterBottom
                            id={id}
                            variant="h5"
                        >
                            {children}
                            <a className={classes.headingLink} href={`#${id}`}>
                                <Link className={classes.headingIcon} />
                            </a>
                        </Typography>
                    );
                },
                h4: ({ children }) => {
                    const id = paramCase(children);

                    return (
                        <Typography
                            color="textPrimary"
                            component="h4"
                            gutterBottom
                            id={id}
                            variant="h6"
                        >
                            {children}
                            <a className={classes.headingLink} href={`#${id}`}>
                                <Link className={classes.headingIcon} />
                            </a>
                        </Typography>
                    );
                },
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
            }}
        >
            <MDXRenderer>{content}</MDXRenderer>
        </MDXProvider>
    );
};

export default Markdown;
