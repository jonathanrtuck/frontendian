import { format, parseISO } from 'date-fns';

import { Author } from './types';

export const getAuthorName = ({
    familyName,
    givenName,
}: Pick<Author, 'familyName' | 'givenName'>): string =>
    `${givenName} ${familyName}`;

export const getFormattedDate = (iso8601: string): string =>
    format(parseISO(iso8601), 'PPP');
