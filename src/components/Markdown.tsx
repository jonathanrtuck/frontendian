import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { OpenInNewOutlined } from '@material-ui/icons';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const useStyles = makeStyles({
    aIcon: {
        fontSize: '.75em',
        marginLeft: '.1em',
        verticalAlign: 'top',
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
                h2: ({ children }) => (
                    <Typography
                        color="textPrimary"
                        component="h2"
                        gutterBottom
                        variant="h4"
                    >
                        {children}
                    </Typography>
                ),
                h3: ({ children }) => (
                    <Typography
                        color="textPrimary"
                        component="h3"
                        gutterBottom
                        variant="h5"
                    >
                        {children}
                    </Typography>
                ),
                h4: ({ children }) => (
                    <Typography
                        color="textPrimary"
                        component="h4"
                        gutterBottom
                        variant="h6"
                    >
                        {children}
                    </Typography>
                ),
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
