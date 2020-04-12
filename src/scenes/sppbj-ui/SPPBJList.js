import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import CustomTable from 'components/material-ui/CustomTable';
import { ThemeProvider } from '@material-ui/core/styles';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import { parse, stringify } from 'qs';
import apis from 'apis';
import themePage from 'scenes/theme';
import useTheme from '@material-ui/core/styles/useTheme';

function SPPBJList(props) {
    const theme = useTheme();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [rows, setRows] = useState([]);
    const [query, setQuery] = useState(parse(props.location.search, { ignoreQueryPrefix: true }));

    const title = 'List of SPPBJ';

    const headCells = [
        { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
        {
            id: 'description',
            numeric: false,
            disablePadding: false,
            label: 'Description',
        },
        { id: 'setting', numeric: false, disablePadding: false, label: '' },
    ];

    const columnWidths = [theme.spacing(15), theme.spacing(15), theme.spacing(65)];

    const handleSearch = find => event => {
        event.preventDefault();
        history.push({
            pathname: '/sppbj',
            search: stringify({
                find: find,
            }),
        });
    };

    useEffect(() => {
        setQuery(parse(props.location.search, { ignoreQueryPrefix: true }));
    }, [props.location]);

    useEffect(() => {
        const fetchSections = async (currPage, perPage, find) => {
            setIsLoading(true);
            apis.sppbj
                .getSections(currPage + 1, perPage, find)
                .then(res => {
                    const { data, pages } = res;
                    let data_temp = data.map(item => ({
                        _id: item['_id'],
                        title: item['title'],
                        description: item['description'],
                    }));
                    setRows(data_temp);
                    setTotalPages(pages);
                })
                .catch(err => {
                    console.log('Error in fetchSPPBJ.\n', err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        fetchSections(page, rowsPerPage, query['find']);
    }, [page, rowsPerPage, query]);

    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar handleSearch={()=>{}} />
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
            />
        </ThemeProvider>
    );
}

export default withRouter(SPPBJList);
