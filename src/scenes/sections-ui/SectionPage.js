import React, { useEffect, useState } from 'react';
import CustomTable from 'components/material-ui/CustomTable';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import {getSectionsPagination} from 'apis/Section';

function createData(id, name, context) {
    return { id, name, context };
}

const title = 'List of Sections';

const headCells = [
    { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'context', numeric: false, disablePadding: false, label: 'Context' },
    { id: 'setting', numeric: false, disablePadding: false, label: '' },
];

/*
const rows = [
    createData('Section1', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section2', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section3', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section4', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section5', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section6', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section7', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section8', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section9', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section10', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section11', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section12', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
    createData('Section13', 'Perumahan #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula urna rutrum risus pretium...'),
];
*/


export default function SectionPage() {
    const [page, setPage] = React.useState(0);
    const [stateRows, setStateRows] = useState([]);
    useEffect(() => {
        const fetchSections = async (numPage, perPage) => {
            getSectionsPagination(numPage, perPage)
                .then(res => {
                    setStateRows(res)
                })
                .catch(err => {
                    console.log("Error in FeaturedCatalogue.\n", err);
                });
        };
        fetchSections(page, 3);
    }, [page]);
    return (
        <div>
            <CustomNavbar/>
            <CustomTable title={title} headCells={headCells} rows={stateRows} page={page} setPage={setPage}/>
        </div>
    );
}