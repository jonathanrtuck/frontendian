require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    pathPrefix: '/frontendian',
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'contentful',
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
            },
        },
        'gatsby-theme-material-ui',
    ],
    siteMetadata: {
        title: 'frontendian',
    },
};
