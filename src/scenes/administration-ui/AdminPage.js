import React from 'react';
import CustomTable from 'components/material-ui/CustomTable';
import CustomNavbar from 'components/material-ui/CustomNavbar';

function createData(username, name, position, company_addr) {
    return { username, name, position, company_addr };
}

const title = "List of Users";

const headCells = [
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
    { id: 'company_addr', numeric: false, disablePadding: false, label: 'Company Address' },
    { id: 'setting', numeric: false, disablePadding: false, label: '' },
];

const rows = [
    createData('testing', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing1', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing2', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing3', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing4', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing5', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing6', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing7', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing8', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing9', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing10', "Isi dengan nama", "posisi?", "alamat di mana?"),
    createData('testing11', "Isi dengan nama", "posisi?", "alamat di mana?"),
];

export default function AdminPage() {
    return (
        <div>
            <CustomNavbar/>
            <CustomTable title={title} headCells={headCells} rows={rows}/>
        </div>
    );
}