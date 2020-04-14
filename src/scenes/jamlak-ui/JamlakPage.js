import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';
import CustomTableJamlak from 'components/material-ui/CustomTableJamlak';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import apis from 'apis';
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
        { id: 'no_jamlak', numeric: false, disablePadding: false, label: 'No' },
        { id: 'tgl_pembuatan', numeric: false, disablePadding: false, label: 'Tanggal Pembuatan' },
        { id: 'nama_bank', numeric: false, disablePadding: false, label: 'Nama Bank' },
        { id: 'no_sppbj', numeric: false, disablePadding: false, label: 'No SPPBJ' },
        { id: 'setting', numeric: false, disablePadding: false, label: '' },
    ];

    const columnWidths = [theme.spacing(0), theme.spacing(20)];

    const handleSearch = find => event => {
        event.preventDefault();
        history.push({
            pathname: '/jamlak',
            search: stringify({
                find: find,
            }),
        });
    };

    useEffect(() => {
        setQuery(parse(props.location.search, { ignoreQueryPrefix: true }));
    }, [props.location]);

    useEffect(() => {
        const fetchJamlaks = async (currPage, perPage, find) => {
            setIsLoading(true);
            apis.jamlak
                .getJamlaks(currPage + 1, perPage, find)
                .then(res => {
                    const { data, pages } = res;
                    let data_temp = data.map(item => ({
                        _id: item['_id'],
                        no_jamlak: item['no_jamlak'],
                        tgl_pembuatan: item['tgl_pembuatan'],
                        nama_bank: item['nama_bank'],
                        no_sppbj: item['no_sppbj'],
                    }));
                    setRows(data_temp);
                    setTotalPages(pages);
                })
                .catch(err => {
                    console.log('Error in fetchJamlaks.\n', err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        fetchJamlaks(page, rowsPerPage, query['find']);
    }, [page, rowsPerPage, query]);

    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <CustomTableJamlak
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
                handleSearch={handleSearch}
            />
        </ThemeProvider>
    );
}

export default withRouter(JamlakPage);
