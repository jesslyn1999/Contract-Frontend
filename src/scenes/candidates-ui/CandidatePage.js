import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';
import CustomTable from 'components/material-ui/CustomTable';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import { parse, stringify } from 'qs';
import apis from 'apis';
import themePage from 'scenes/theme';
import { v1 as uuidv1 } from 'uuid';
import CandidateSettingButton from "scenes/candidates-ui/setting-button/CandidateSettingButton";

function CandidatePage(props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([]);

    const title = 'List of Candidates';

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
        const fetchCandidates = async (currPage, perPage, find) => {
            setIsLoading(true);
            apis.candidate
                .getAllCandidates()
                .then(res => {
                    const { data } = res;
                    if (data && data.length > 0) {
                        let heads = [];
                        Object.keys(data[0]).forEach(item => {
                            heads.push({
                                id: item,
                                numeric: !isNaN(data[0][item]),
                                disablePadding: false,
                                label: item,
                            });
                        });
                        heads.push({ id: 'setting', numeric: false, disablePadding: false, label: '' });
                        setHeadCells(heads);
                        setRows(data.map(item => ({'id_init': uuidv1(), ...item})));
                    }
                })
                .catch(err => {
                    console.log('Error in fetchCandidates.\n', err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        fetchCandidates();
    }, []);

    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <CustomTable
                title={title}
                isLoading={isLoading}
                headCells={headCells}
                rows={rows}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                handleSearch={handleSearch}
                fromPersonalDb={false}
                settingButton={props => <CandidateSettingButton {...props} />}
            />
        </ThemeProvider>
    );
}

export default withRouter(CandidatePage);
