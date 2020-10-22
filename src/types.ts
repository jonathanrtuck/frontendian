export type Article = {
    author: Author;
    content: {
        childMdx: {
            body: string;
        };
    };
    createdAt: Iso8601;
    description: {
        description: string;
    };
    id: ID;
    tags: Tag[];
    title: string;
    updatedAt: Iso8601;
};

export type Author = {
    email: Email;
    familyName: string;
    givenName: string;
    id: ID;
};

export type Email = string;

export type ID = string;

export type Iso8601 = string;

export type Tag = string;
