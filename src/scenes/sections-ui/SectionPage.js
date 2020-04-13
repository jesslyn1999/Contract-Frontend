import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';
import CustomTable from 'components/material-ui/CustomTable';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import apis from 'apis';
import { parse, stringify } from 'qs';
import useTheme from '@material-ui/core/styles/useTheme';
import themePage from 'scenes/theme';
import SectionSettingButton from 'scenes/sections-ui/setting-button/SectionSettingButton';

function SectionPage(props) {
    const theme = useTheme();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [rows, setRows] = useState([]);
    const [query, setQuery] = useState(parse(props.location.search, { ignoreQueryPrefix: true }));

    const title = 'List of Sections';

    const headCells = [
        { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
        { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
        { id: 'setting', numeric: false, disablePadding: false, label: '' },
    ];

    const columnWidths = [theme.spacing(30), theme.spacing(65)];

    const handleSearch = find => event => {
        event.preventDefault();
        history.push({
            pathname: '/section',
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
            apis.section
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
                    console.log('Error in fetchSections.\n', err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        fetchSections(page, rowsPerPage, query['find']);
    }, [page, rowsPerPage, query]);

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
                handleSearch={handleSearch}
                settingButton={props => <SectionSettingButton {...props} />}
            />
        </ThemeProvider>
    );
}

export default withRouter(SectionPage);
