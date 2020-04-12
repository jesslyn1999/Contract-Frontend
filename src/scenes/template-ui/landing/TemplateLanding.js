import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { parse, stringify } from 'qs';
import CustomCard from 'components/material-ui/CustomCard';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import themePage from 'scenes/theme';
import { getTemplates } from 'apis/Template';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5, 0),
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
    },
    grid: {
        padding: theme.spacing(4),
    },
    title: {
        flex: '1 1 100%',
    },
    toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    searchBar: {
        display: 'flex',
        flex: 1,
        marginBottom: theme.spacing(3),
        justifyContent: 'center',
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
        // minWidth: '70%',
        maxWidth: theme.spacing(90),
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
    pagination: {
        padding: theme.spacing(3),
    },
}));

function TemplateLanding(props) {
    const { setPage, dataHandle } = props;
    const classes = useStyles();
    const [templates, setTemplates] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [query, setQuery] = React.useState(
        parse(props.location.search, { ignoreQueryPrefix: true })['find'],
    );
    const [tempQuery, setTempQuery] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        const fetchTemplates = async () => {
            getTemplates(currentPage, 6, query)
                .then(res => {
                    const { data, pages } = res;
                    const templatesData = data.map(item => ({
                        _id: item['_id'],
                        title: item['title'],
                        description: item['description'],
                        content: item['content'],
                    }));
                    setPageCount(pages);
                    setTemplates(templatesData);
                })
                .catch(err => {
                    console.log('Error:', err);
                });
        };
        fetchTemplates();
    }, [currentPage, query]);

    const handlePageChange = (_, value) => {
        setCurrentPage(value);
    };

    const handleSearch = find => event => {
        setQuery(find);
        event.preventDefault();
        history.push({
            pathname: '/template',
            search: stringify({
                find: find,
            }),
        });
    };

    React.useEffect(() => {
        setQuery(parse(props.location.search, { ignoreQueryPrefix: true })['find']);
    }, [props.location]);

    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <div className={classes.root}>
                <Toolbar className={clsx(classes.toolbar, null)}>
                    <Typography className={classes.title} variant="h4" gutterBottom>
                        <Box fontWeight="fontWeightBold">Daftar Template</Box>
                    </Typography>
                    <Tooltip title="Add Template" enterDelay={500} leaveDelay={100}>
                        <IconButton href="" aria-label="Add Template" onClick={setPage}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>

                <div centered="true" className={classes.searchBar}>
                    <Paper
                        centered="true"
                        component="form"
                        className={classes.search}
                        onSubmit={handleSearch(tempQuery)}
                    >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            fullWidth
                            placeholder="Search ..."
                            value={tempQuery}
                            onChange={event => setTempQuery(event.target.value)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Paper>
                </div>

                <Grid container spacing={3}>
                    {templates.map(row => (
                        <Grid key={row._id} className={classes.grid} item xs={4}>
                            <CustomCard
                                title={row.title}
                                content={row.description}
                                templateId={row._id}
                                setObjData={dataHandle}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Grid container justify="center">
                <Pagination
                    centered="true"
                    count={pageCount}
                    color="primary"
                    onChange={handlePageChange}
                    className={classes.pagination}
                />
            </Grid>
        </ThemeProvider>
    );
}

TemplateLanding.propTypes = {
    setPage: PropTypes.func.isRequired,
    dataHandle: PropTypes.func.isRequired,
};

export default withRouter(TemplateLanding);
