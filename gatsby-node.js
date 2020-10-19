const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions: { createPage } }) =>
    new Promise((resolve, reject) => {
        const articleTemplate = path.resolve('./src/templates/article.js');
        const tagTemplate = path.resolve('./src/templates/tag.js');

        resolve(
            graphql(
                `
                    {
                        allContentfulArticle {
                            distinct(field: tags)
                            edges {
                                node {
                                    contentfulid
                                }
                            }
                        }
                    }
                `,
            ).then(({ data, errors }) => {
                if (errors) {
                    console.log(errors);

                    reject(errors);
                }

                // create page for each tag
                data.allContentfulArticle.distinct.forEach((tag) => {
                    createPage({
                        component: tagTemplate,
                        context: {
                            tag,
                        },
                        path: `/tags/${tag}`,
                    });
                });

                // create page for each article
                data.allContentfulArticle.edges.forEach(
                    ({ node: { contentfulid: id } }) => {
                        createPage({
                            component: articleTemplate,
                            context: {
                                id,
                            },
                            path: `/articles/${id}`,
                        });
                    },
                );
            }),
        );
    });
