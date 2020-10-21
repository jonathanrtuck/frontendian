export type ArticleEdge = {
    node: ArticleNode;
};

export type ArticleNode = {
    content?: {
        childMdx: {
            body: string;
        };
    };
    contentfulid?: string;
    createdAt: string;
    description?: {
        description: string;
    };
    tags: Tag[];
    title: string;
};

export type Tag = string;
