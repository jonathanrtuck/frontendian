import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { graphql, PageProps } from 'gatsby';

import Page from '../components/Page';
import Tags from '../components/Tags';
import { Tag } from '../types';

export const pageQuery = graphql`
    query TagsPageQuery {
        allContentfulArticle {
            distinct(field: tags)
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    tags: {
        marginTop: theme.spacing(2),
    },
}));

type TagsPageProps = PageProps<{
    allContentfulArticle: {
        distinct: Tag[];
    };
}>;

const TagsPage = ({
    data: {
        allContentfulArticle: { distinct: tags },
    },
}: TagsPageProps) => {
    const classes = useStyles();

    return (
        <Page title="Tags">
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
