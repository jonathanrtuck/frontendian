const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions: { createPage } }) =>
    new Promise((resolve, reject) => {
        const articleTemplate = path.resolve('./src/templates/article.js');

        resolve(
            graphql(
                `
                    {
                        allContentfulArticle {
                            edges {
                                node {
                                    contentfulid
                                    title
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

                data.allContentfulArticle.edges.forEach(
                    ({ node: { contentfulid: id } }) => {
                        createPage({
                            component: articleTemplate,
                            context: {
                                id,
                            },
                            path: id,
                        });
                    },
                );
            }),
        );
    });
