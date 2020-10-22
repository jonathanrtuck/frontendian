import { format, parseISO } from 'date-fns';

export const getFormattedDate = (iso8601: string): string =>
    format(parseISO(iso8601), 'PPP');
