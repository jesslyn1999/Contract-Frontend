import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import themePage from 'scenes/theme';
import JamlakTable from 'scenes/jamlak-ui/table/JamlakTable';

function SpbbjPage() {
    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <JamlakTable />
        </ThemeProvider>
    );
}

export default withRouter(SpbbjPage);
