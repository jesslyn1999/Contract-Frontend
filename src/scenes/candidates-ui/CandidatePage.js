import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import themePage from 'scenes/theme';
import CandidateTable from 'scenes/candidates-ui/table/CandidateTable';

function CandidatePage() {
    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <CandidateTable />
        </ThemeProvider>
    );
}

export default withRouter(CandidatePage);
