import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getAllKeys } from 'apis/Candidate';

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    paper: {
        height: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        background: '#009FE5',
    },
    listitem: {
        height: 40,
    },
    grid: {
        padding: theme.spacing(1),
    },
    tag: {
        fontSize: 10,
    },
    toolbar: theme.mixins.toolbar,
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

export default function TagPanelRight() {
    const classes = useStyles();
    const [value, setValue] = React.useState('get');
    const [tableName, setTableName] = React.useState('PEMENANG');
    const [open, setOpen] = React.useState(false);
    const [tableColumn, setTableColumn] = React.useState([]);
    const [tables, setTables] = React.useState(['PEMENANG', 'SPPBJ', 'JAMLAK']);

    useEffect(() => {
        if (tableName === 'JAMLAK') {
            var columns = [
                'NO_JAMLAK',
                'TGL_PEMBUATAN',
                'TGL_JATUH_TEMPO',
                'NAMA_BANK',
                'ALAMAT_BANK',
                'NOMINAL_GARANSI',
                'NO_SPPBJ',
            ];
            setTableColumn(columns);
        } else if (tableName === 'PEMENANG') {
            const fetchKeys = async () => {
                getAllKeys(
                    'http://api.logistik.itb.ac.id',
                    '/ta_sppemenang/2019?token=8ef83647567cdfgb4K776509242ce0b9',
                )
                    .then(res => {
                        setTableColumn(res);
                    })
                    .catch(err => {
                        console.log('Error fetching keys.\n', err);
                    });
            };
            fetchKeys();
        } else if (tableName === 'SPPBJ') {
            const fetchKeys = async () => {
                getAllKeys(
                    'http://api.logistik.itb.ac.id',
                    'ta_sppbj?token=8ef83647567cdfgb4K776509242ce0b9',
                )
                    .then(res => {
                        setTableColumn(res);
                    })
                    .catch(err => {
                        console.log('Error fetching keys.\n', err);
                    });
            };
            fetchKeys();
        }
    }, [tableName]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 'get') {
            let tables = ['PEMENANG', 'SPPBJ', 'JAMLAK'] 
            setTables(tables);
            setTableName(tables[0]);
        } else 
        if (newValue === 'set') {
            let tables = ['SPPBJ'];
            setTables(tables);
            setTableName(tables[0]);
        }
    };

    const handleSelectChange = event => {
        setTableName(event.target.value);
    };

    const handleSelectOpen = () => {
        setOpen(true);
    };

    const handleSelectClose = () => {
        setOpen(false);
    };

    const handleListClicked = text => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="right"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />

            <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="Set/Get Tab"
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab value="get" label="Get" />
                <Tab value="set" label="Set" />
            </Tabs>

            <TabPanel value={value} index="get">
                <Box display="flex" alignItems="center" justifyContent="center">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="table-name-label">Nama tabel</InputLabel>
                        <Select
                            labelId="table-name-label"
                            id="table-name-select"
                            open={open}
                            onClose={handleSelectClose}
                            onOpen={handleSelectOpen}
                            value={tableName}
                            onChange={handleSelectChange}
                        >
                            {tables.map((text, index) => (
                                <MenuItem value={text}>{text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Divider />

                <List>
                    {tableColumn.map((text, index) => (
                        <Grid container className={classes.grid} justify="center" spacing={0}>
                            <Grid key={`${value}:${text}`} item xs={5}>
                                <Paper variant="outlined" className={classes.paper}>
                                    <Box
                                        component="div"
                                        className={classes.tag}
                                        textOverflow="ellipsis"
                                    >
                                        {text}
                                    </Box>
                                </Paper>
                            </Grid>

                            <Grid key={value} item xs={7}>
                                <ListItem
                                    className={classes.listitem}
                                    onClick={handleListClicked.bind(this, '<<get:' + text + '>>')}
                                    button
                                    key={text}
                                >
                                    <ListItemText
                                        primary={
                                            <Box
                                                component="div"
                                                className={classes.tag}
                                                textOverflow="ellipsis"
                                            >
                                                &lt;&lt;get:{text}&gt;&gt;
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            </Grid>
                        </Grid>
                    ))}
                </List>
            </TabPanel>

            <TabPanel value={value} index="set">
                <Box display="flex" alignItems="center" justifyContent="center">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="table-name-label">Nama tabel</InputLabel>
                        <Select
                            labelId="table-name-label"
                            id="table-name-select"
                            open={open}
                            onClose={handleSelectClose}
                            onOpen={handleSelectOpen}
                            value={tableName}
                            onChange={handleSelectChange}
                        >
                            {tables.map((text, index) => (
                                <MenuItem value={text}>{text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Divider />

                <List>
                    {tableColumn.map((text, index) => (
                        <Grid container className={classes.grid} justify="center" spacing={0}>
                            <Grid key={value} item xs={5}>
                                <Paper variant="outlined" className={classes.paper}>
                                    <Box
                                        component="div"
                                        className={classes.tag}
                                        textOverflow="ellipsis"
                                    >
                                        {text}
                                    </Box>
                                </Paper>
                            </Grid>

                            <Grid key={`${value}:${text}`} item xs={7}>
                                <ListItem
                                    className={classes.listitem}
                                    onClick={handleListClicked.bind(this, `<<set:${text}>>`)}
                                    button
                                    key={text}
                                >
                                    <ListItemText
                                        primary={
                                            <Box
                                                component="div"
                                                className={classes.tag}
                                                textOverflow="ellipsis"
                                            >
                                                &lt;&lt;set:{text}&gt;&gt;
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            </Grid>
                        </Grid>
                    ))}
                </List>
            </TabPanel>

        </Drawer>
    );
}
