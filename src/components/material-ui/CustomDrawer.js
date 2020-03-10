import React from 'react';
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
        padding: theme.spacing(2),
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
    const [value, setValue] = React.useState('set');
    const [tableName, setTableName] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
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

    const handleListClicked = (text) => {
        navigator.clipboard.writeText(text);
    }

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
                <Tab value="set" label="Set" />
                <Tab value="get" label="Get" />
            </Tabs>

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
                            <MenuItem value="SPPBJ">SPPBJ</MenuItem>
                            <MenuItem value="Jamlak">Jamlak</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Divider />

                <List>
                    {['<<set:nosurat>>', '<<set:namasurat>>'].map((text, index) => (
                        <Grid container className={classes.grid} justify="center" spacing={0}>
                            <Grid key={value} item xs={4}>
                                <Paper variant="outlined" className={classes.paper}>
                                    No Surat
                                </Paper>
                            </Grid>

                            <Grid key={value} item xs={8}>
                                <ListItem
                                    className={classes.listitem}
                                    onClick={handleListClicked.bind(this, text)}
                                    button
                                    key={text}
                                >
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Grid>
                        </Grid>
                    ))}
                </List>
            </TabPanel>

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
                            <MenuItem value="SPPBJ">SPPBJ</MenuItem>
                            <MenuItem value="Jamlak">Jamlak</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Divider />

                <List>
                    {['<<set:nosurat>>', '<<set:namasurat>>'].map((text, index) => (
                        <Grid container className={classes.grid} justify="center" spacing={0}>
                            <Grid key={value} item xs={4}>
                                <Paper variant="outlined" className={classes.paper}>
                                    No Surat
                                </Paper>
                            </Grid>

                            <Grid key={value} item xs={8}>
                                <ListItem
                                    className={classes.listitem}
                                    onClick={handleListClicked.bind(this, text)}
                                    button
                                    key={text}
                                >
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Grid>
                        </Grid>
                    ))}
                </List>
            </TabPanel>
        </Drawer>
    );
}
