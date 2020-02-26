import React, { useState, useEffect } from 'react';
import CustomTable from 'components/material-ui/CustomTable';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import { getSections } from 'apis/Section';


export default function SectionPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [headCells, setHeadCells] = useState([]);
    const [rows, setRows] = useState([]);

    const title = 'List of Sections';

    useEffect(() => {
        const fetchSections = async (currPage, perPage) => {
            setIsLoading(true);
            getSections(currPage + 1, perPage)
                .then(res => {
                    const { data, pages } = res;  // todo
                    let headCellsTemp = [];
                    if (data.length > 0) {
                        Object.keys(data[0]).forEach((value) => {
                            headCellsTemp.push({
                                id: value,
                                numeric: false,
                                disablePadding: false,
                                label: value,
                            });
                        });
                        headCellsTemp.push({ id: 'setting', numeric: false, disablePadding: false, label: '' });
                    }
                    setHeadCells([...headCellsTemp]);
                    setRows(data);
                    setTotalPages(pages);
                })
                .catch(err => {
                    console.log('Error in fetchSections.\n', err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        fetchSections(page, rowsPerPage);
    }, [page, rowsPerPage]);
    return (
        <div>
            <CustomNavbar/>
            {!isLoading ?
                    <CustomTable title={title} headCells={headCells} rows={rows}
                                 page={page} setPage={setPage}
                                 rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                                 totalPages={totalPages}
                    />
                :
                <div>
                    waiting...
                </div>
            }
        </div>
    );
}
