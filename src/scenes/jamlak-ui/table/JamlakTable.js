import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import apis from 'apis';
import CustomTable from 'components/material-ui/CustomTable';
import SpbbjSettingButton from 'scenes/spbbj/setting-button/SpbbjSettingButton';

function JamlakTable(props) {
    const { actionSettingButton } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([]);

    const title = 'List of Document Kontrak';

    useEffect(() => {
        const fetchSpbbj = async (currPage, perPage) => {
            setIsLoading(true);
            apis.spbbj
                .getSpbbj(currPage + 1, perPage)
                .then(res => {
                    const { data, pages } = res;
                    if (data && data.length > 0) {
                        let heads = [];
                        // const { _id, template_id, data_pemenang, data_form }
                        ['template_id']
                            .concat(Object.keys(data[0].data_pemenang || {}))
                            .concat(Object.keys(data[0].data_form || {}))
                            .forEach(item => {
                                heads.push({
                                    id: item,
                                    numeric: false,
                                    disablePadding: false,
                                    label: item,
                                });
                            });
                        heads.push({
                            id: 'setting',
                            numeric: false,
                            disablePadding: false,
                            label: '',
                        });
                        let data_temp = data.map(item => {
                            const { _id, template_id, data_pemenang, data_form } = item;
                            return {
                                _id: _id,
                                template_id: template_id,
                                ...data_pemenang,
                                ...data_form,
                            };
                        });
                        setHeadCells(heads);
                        setRows(data_temp);
                        setTotalPages(pages);
                    }
                })
                .catch(err => {
                    console.log('Error in fetchSpbbj.\n', err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        fetchSpbbj(page, rowsPerPage);
    }, [page, rowsPerPage]);

    return (
        <CustomTable
            noToolbar
            title={title}
            isLoading={isLoading}
            headCells={headCells}
            rows={rows}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={totalPages}
            settingButton={actionSettingButton || (props => <SpbbjSettingButton {...props} />)}
        />
    );
}

JamlakTable.propTypes = {
    actionSettingButton: PropTypes.func,
};

export default withRouter(JamlakTable);
