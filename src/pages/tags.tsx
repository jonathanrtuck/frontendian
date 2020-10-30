import React, { ReactElement } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Page from '../components/Page';
import Tags from '../components/Tags';
import { Tag } from '../types';

export const pageQuery = graphql`
    query TagsPageQuery {
        tags: allArticle {
            distinct(field: meta___tags)
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    tags: {
        marginTop: theme.spacing(2),
    },
}));

const TagsPage = ({
    data: {
        tags: { distinct: tags },
    },
}: PageProps<{
    tags: {
        distinct: Tag[];
    };
}>): ReactElement => {
    const classes = useStyles();

    return (
        <Page title="Tags">
            <Helmet>
                <meta name="description" content="List of all tags" />
            </Helmet>
            <header>
                <Typography color="textPrimary" component="h1" variant="h3">
                    Tags
                </Typography>
            </header>
            <Tags className={classes.tags} tags={tags} />
        </Page>
    );
};

export default TagsPage;
