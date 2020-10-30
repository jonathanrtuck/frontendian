export type Article = {
    content: string;
    description: string;
    meta: {
        author: Author;
        id: ID;
        publishedAt: Iso8601;
        tags: Tag[];
        updatedAt: Iso8601;
    };
    title: string;
};

export type Author = {
    familyName: string;
    givenName: string;
    meta: {
        id: ID;
    };
};

export type Email = string;

export type ID = string;

export type Iso8601 = string;

export type Tag = string;
