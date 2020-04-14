import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import themePage from 'scenes/theme';
import DocumentCreatorJamlakPanel from 'scenes/document-ui/panel/DocumentCreatorSpbbjPanel';

function DocumentCreatorSpbbjPage(props) {
    // const { candidateData, templateData } = props.location;
    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <DocumentCreatorJamlakPanel/>
        </ThemeProvider>
    );
}

export default DocumentCreatorSpbbjPage;