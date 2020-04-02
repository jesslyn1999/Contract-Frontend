import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';
import CustomTable from 'components/material-ui/CustomTable';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import { getSections } from 'apis/Section';
import { parse, stringify } from 'qs';
import useTheme from '@material-ui/core/styles/useTheme';
import themePage from 'scenes/theme';

function JamlakPage(props) {
    const theme = useTheme();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [rows, setRows] = useState([]);
    const [query, setQuery] = useState(parse(props.location.search, { ignoreQueryPrefix: true }));

    const title = 'List of Jaminan Pelaksana';

    const headCells = [
        { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
        { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
        { id: 'setting', numeric: false, disablePadding: false, label: '' },
    ];

    const columnWidths = [theme.spacing(30), theme.spacing(65)];


    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <CustomTable
                columnWidths={columnWidths}
                title={title}
                isLoading={isLoading}
                headCells={headCells}
                rows={rows}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                totalPages={totalPages}
                handleSearch={()=>{}}
            />
        </ThemeProvider>
    );
}

export default withRouter(JamlakPage);
