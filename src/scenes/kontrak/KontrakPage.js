import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import themePage from 'scenes/theme';
import KontrakTable from 'scenes/kontrak/table/KontrakTable';

function KontrakPage() {
    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <KontrakTable />
        </ThemeProvider>
    );
}

export default withRouter(KontrakPage);
