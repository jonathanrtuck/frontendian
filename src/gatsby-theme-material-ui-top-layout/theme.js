import { createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        background: {
            default: '#fff',
        },
        primary: {
            dark: grey[900],
            light: grey[100],
            main: grey[500],
        },
    },
});

export default theme;
