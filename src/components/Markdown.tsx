import React, { createElement, PropsWithChildren, ReactElement } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { Link as LinkIcon, OpenInNewOutlined } from '@material-ui/icons';
import { paramCase } from 'change-case';
import { Link } from 'gatsby-theme-material-ui';
import { onlyText } from 'react-children-utilities';
import rehype2react from 'rehype-react';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

const useStyles = makeStyles((theme) => ({
    heading: {
        '&:hover $heading__link': {
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

const Markdown = ({ content }: { content: string }): ReactElement => {
    const classes = useStyles();

    const processor = unified()
        .use(markdown)
        .use(remark2rehype)
        .use(rehype2react, {
            components: {
                a: ({
                    children,
                    href,
                }: PropsWithChildren<{ href: string }>) => {
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
                h2: ({ children }: PropsWithChildren<{}>) => {
                    const id = paramCase(onlyText(children));

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
                h3: ({ children }: PropsWithChildren<{}>) => {
                    const id = paramCase(onlyText(children));

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
                                <LinkIcon className={classes.heading__icon} />
                            </a>
                        </Typography>
                    );
                },
                h4: ({ children }: PropsWithChildren<{}>) => {
                    const id = paramCase(onlyText(children));

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
                                <LinkIcon className={classes.heading__icon} />
                            </a>
                        </Typography>
                    );
                },
                // hr
                // inlineCode
                li: ({ children }: PropsWithChildren<{}>) => (
                    <Typography
                        color="textPrimary"
                        component="li"
                        variant="body1"
                    >
                        {children}
                    </Typography>
                ),
                p: ({ children }: PropsWithChildren<{}>) => (
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
            },
            createElement,
        });

    return <>{processor.processSync(content).result}</>;
};

export default Markdown;
