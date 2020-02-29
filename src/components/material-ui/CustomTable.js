import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import SectionSettingButton from './SectionSettingButton';
import CreateNewSection from 'scenes/sections-ui/create-new-section/CreateNewSection';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { title } = props;

    return (
        <Toolbar className={clsx(classes.root, null)}>
            <Typography component="div" className={classes.title} variant="h6" id="tableTitle">
                {title}
            </Typography>
            <CreateNewSection
                triggerContent={() => (
                    <Tooltip title="Add Section" enterDelay={500} leaveDelay={100}>
                        <IconButton href="" aria-label="Add Section">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )}
            />
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    title: PropTypes.string.isRequired,
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
    const { headCells, order, orderBy, onRequestSort, columnWidths } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            href=""
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            style={{ width: columnWidths[index] }}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    columnWidths: PropTypes.arrayOf(PropTypes.number).isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '1 1 100%',
    },
}));

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        margin: theme.spacing(5, 0),
    },
    paper: {
        width: '100%',
        margin: 'auto',
        marginBottom: theme.spacing(2),
        minWidth: theme.spacing(90),
        maxWidth: theme.spacing(120),
    },
}));

export default function EnhancedTable(props) {
    const {
        columnWidths,
        title,
        isLoading,
        headCells,
        rows,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        totalPages,
    } = props;
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(headCells[1] ? headCells[1].label : '');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar title={title} />
                <TableContainer>
                    <Table aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                            columnWidths={columnWidths}
                        />
                        {!isLoading ? (
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy)).map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row[Object.keys(row)[0]]}
                                        >
                                            {Object.keys(row).map(
                                                (k, index) =>
                                                    index > 0 &&
                                                    (index === 1 ? (
                                                        <TableCell
                                                            component="th"
                                                            key={row[Object.keys(row)[0]] + index}
                                                            scope="row"
                                                            style={{
                                                                width: columnWidths[index - 1],
                                                            }}
                                                        >
                                                            {row[k]}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell
                                                            align="left"
                                                            key={row[Object.keys(row)[0]] + index}
                                                            style={{
                                                                width: columnWidths[index - 1],
                                                            }}
                                                        >
                                                            {row[k]}
                                                        </TableCell>
                                                    )),
                                            )}
                                            <TableCell align="center">
                                                <SectionSettingButton
                                                    rowId={row[Object.keys(row)[0]]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 61 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell>waiting...</TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50, 100]}
                    component="div"
                    count={totalPages * rowsPerPage} // todo
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

EnhancedTable.propTypes = {
    columnWidths: PropTypes.arrayOf(PropTypes.number).isRequired,
    title: PropTypes.string.isRequired,
    headCells: PropTypes.arrayOf(PropTypes.object).isRequired, // assume: first element consist of label Id
    rows: PropTypes.arrayOf(PropTypes.object).isRequired, // assume: first key of the object in array is Id
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
};
