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
                        articlesIds: allArticle {
                            distinct(field: meta___id)
                        }
                        authorIds: allArticle {
                            distinct(field: meta___author___meta___id)
                        }
                        tags: allArticle {
                            distinct(field: meta___tags)
                        }
                    }
                `,
            ).then(({ data: { articlesIds, authorIds, tags }, errors }) => {
                if (errors) {
                    console.log(errors);

                    reject(errors);
                }

                // create page for each article
                articlesIds.distinct.forEach((id) => {
                    createPage({
                        component: articleTemplate,
                        context: {
                            id,
                        },
                        path: `/articles/${id}`,
                    });
                });

                // create page for each author
                authorIds.distinct.forEach((id) => {
                    createPage({
                        component: authorTemplate,
                        context: {
                            id,
                        },
                        path: `/authors/${id}`,
                    });
                });

                // create page for each tag
                tags.distinct.forEach((tag) => {
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
