import React, { ReactElement } from 'react';

import { Typography } from '@material-ui/core';

import Page from '../components/Page';

const NotFoundPage = (): ReactElement => (
    <Page title="Not Found">
        <Typography color="textPrimary" component="h1" variant="h3">
            Page Not Found
        </Typography>
    </Page>
);

export default NotFoundPage;
