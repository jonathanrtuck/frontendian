import { useStaticQuery, graphql } from 'gatsby';

export const useSiteTitle = () => {
    const { site } = useStaticQuery(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `,
    );

    return site.siteMetadata.title;
};
