import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { title, handleSearch } = props;
    const [query, setQuery] = useState('');

    return (
        <Toolbar className={clsx(classes.root, null)}>
            <Typography component="div" className={classes.title} variant="h6" id="tableTitle">
                {title}
            </Typography>
            <div className={classes.searchBar}>
                <Paper component="form" className={classes.search} onSubmit={handleSearch(query)}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        fullWidth
                        placeholder="Search ..."
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Paper>
            </div>
            <CreateNewSection
                triggerContent={() => (
                    <Tooltip
                        title="Add Section"
                        className={classes.plusIcon}
                        enterDelay={500}
                        leaveDelay={100}
                    >
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
    handleSearch: PropTypes.func.isRequired,
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
                        align="center"
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
        flexWrap: 'wrap',
    },
    title: {
        flex: '1 1 100%',
        textAlign: 'center',
        fontSize: theme.spacing(4),
        margin: theme.spacing(2, 0),
    },
    searchBar: {
        flex: 1,
        marginBottom: theme.spacing(5),
    },
    search: {
        position: 'relative',
        borderRadius: 50,
        borderWidth: 'thin',
        borderStyle: 'solid',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        flexGrow: 1,
        // minWidth: '50%',
        maxWidth: theme.spacing(90),
    },
    plusIcon: {
        alignSelf: 'stretch',
        marginBottom: theme.spacing(5),
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        display: 'flex',
    },
    inputInput: {
        padding: theme.spacing(1, 3, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: theme.spacing(2),
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

export default function CustomTable(props) {
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
        handleSearch,
    } = props;
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

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
                <EnhancedTableToolbar title={title} handleSearch={handleSearch} />
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

CustomTable.propTypes = {
    columnWidths: PropTypes.arrayOf(PropTypes.number).isRequired,
    title: PropTypes.string.isRequired,
    headCells: PropTypes.arrayOf(PropTypes.object).isRequired, // assume: first element consist of label Id
    rows: PropTypes.arrayOf(PropTypes.object).isRequired, // assume: first key of the object in array is Id
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    handleSearch: PropTypes.func.isRequired,
};
