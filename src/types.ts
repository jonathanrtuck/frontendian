export type ArticleEdge = {
    node: ArticleNode;
};

export type ArticleNode = {
    content: {
        childMdx: {
            body: string;
        };
    };
    contentfulid: ID;
    createdAt: string;
    description: {
        description: string;
    };
    tags: Tag[];
    title: string;
};

export type ID = string;

export type Tag = string;
