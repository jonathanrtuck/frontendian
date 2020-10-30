const axios = require('axios');
const path = require('path');

const pluginName = path.basename(path.resolve(__dirname));

const error = (str) => {
    console.error('\x1b[31m%s\x1b[0m', '\nerror', str);
};
const success = (str) => {
    console.log('\x1b[32m%s\x1b[0m', '\nsuccess', str);
};

exports.sourceNodes = (
    { actions: { createNode }, createContentDigest, createNodeId },
    { accessToken, spaceId },
) => {
    if (!accessToken || !spaceId) {
        error(
            `you must provide a spaceId and accessToken in the ${pluginName} plugin options in gatsby-config.js`,
        );

        return;
    }

    return axios({
        data: {
            query: `
                query {
                    articleCollection {
                        items {
                            author {
                                familyName
                                givenName
                                id
                            }
                            content
                            description
                            id
                            sys {
                                firstPublishedAt
                                publishedAt
                            }
                            tags
                            title
                        }
                    }
                }
            `,
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'post',
        url: `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
    })
        .then(({ data: { data } }) => {
            const articles = data.articleCollection.items.map(
                ({
                    author,
                    content,
                    description,
                    id,
                    sys: {
                        firstPublishedAt: publishedAt,
                        publishedAt: updatedAt,
                    },
                    tags,
                    title,
                }) => ({
                    content,
                    description,
                    meta: {
                        author: {
                            familyName: author.familyName,
                            givenName: author.givenName,
                            meta: {
                                id: author.id,
                            },
                        },
                        id,
                        publishedAt,
                        tags,
                        updatedAt,
                    },
                    title,
                }),
            );
            const authors = data.articleCollection.items.reduce(
                (acc, { author }) => {
                    if (!acc.find(({ id }) => id === author.id)) {
                        acc.push({
                            familyName: author.familyName,
                            givenName: author.givenName,
                            meta: {
                                id: author.id,
                            },
                        });
                    }

                    return acc;
                },
                [],
            );

            articles.forEach((article) => {
                createNode({
                    ...article,
                    children: [],
                    id: createNodeId(`article-${article.meta.id}`),
                    internal: {
                        content: JSON.stringify(article),
                        contentDigest: createContentDigest(article),
                        type: 'article',
                    },
                    parent: null,
                });
            });
            authors.forEach((author) => {
                createNode({
                    ...author,
                    children: [],
                    id: createNodeId(`author-${author.meta.id}`),
                    internal: {
                        content: JSON.stringify(author),
                        contentDigest: createContentDigest(author),
                        type: 'author',
                    },
                    parent: null,
                });
            });
        })
        .then(() => {
            success('create contentful content nodes');
        })
        .catch(() => {
            error(
                `cannot get content from contentful. have you provided the correct spaceId and accessToken in the ${pluginName} plugin in gatsby-config.js?`,
            );
        });
};
