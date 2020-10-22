const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions: { createPage } }) =>
    new Promise((resolve, reject) => {
        const articleTemplate = path.resolve('./src/templates/article.tsx');
        const authorTemplate = path.resolve('./src/templates/author.tsx');
        const tagTemplate = path.resolve('./src/templates/tag.tsx');

        resolve(
            graphql(
                `
                    {
                        allContentfulArticle {
                            nodes {
                                author {
                                    familyName
                                    givenName
                                    id: contentfulid
                                }
                                createdAt
                                description {
                                    description
                                }
                                id: contentfulid
                                tags
                                title
                            }
                        }
                        allContentfulAuthor {
                            nodes {
                                familyName
                                givenName
                                id: contentfulid
                            }
                        }
                        authors: allContentfulArticle {
                            distinct(field: author___contentfulid)
                        }
                        tags: allContentfulArticle {
                            distinct(field: tags)
                        }
                    }
                `,
            ).then(({ data, errors }) => {
                if (errors) {
                    console.log(errors);

                    reject(errors);
                }

                // create page for each article
                data.allContentfulArticle.nodes.forEach((article) => {
                    createPage({
                        component: articleTemplate,
                        context: article,
                        path: `/articles/${article.id}`,
                    });
                });

                // create page for each author
                data.authors.distinct.forEach((author) => {
                    createPage({
                        component: authorTemplate,
                        context: data.allContentfulAuthor.nodes.find(
                            ({ id }) => id === author,
                        ),
                        path: `/authors/${author}`,
                    });
                });

                // create page for each tag
                data.tags.distinct.forEach((tag) => {
                    createPage({
                        component: tagTemplate,
                        context: {
                            tag,
                        },
                        path: `/tags/${tag}`,
                    });
                });
            }),
        );
    });
