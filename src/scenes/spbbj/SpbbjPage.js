import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import themePage from 'scenes/theme';
import SpbbjTable from 'scenes/spbbj/table/SpbbjTable';

function SpbbjPage() {
    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <SpbbjTable />
        </ThemeProvider>
    );
}

export default withRouter(SpbbjPage);
