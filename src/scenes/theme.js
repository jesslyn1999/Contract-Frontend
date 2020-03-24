import { createMuiTheme } from '@material-ui/core';
import { responsiveFontSizes } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00ACF8',
            contrastText: 'rgba(255,255,255,1)',
        },
    },
    typography: {
        h6: {
            fontSize: '0.86rem',
            '@media (min-width: 600px)': {
                fontSize: '1.25rem',
            },
        },
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: '#fff',
            },
        },
    },
});

export default responsiveFontSizes(theme);