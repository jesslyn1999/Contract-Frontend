import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    appBar: {
        background: '#fff',
        color: '#000',
        minWidth: theme.spacing(90),
    },
    toolbar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: theme.spacing(126),
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

export default function CustomNavbar(props) {
    const classes = useStyles();
    const { handleSearch } = props;
    const [query, setQuery] = useState('');

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton edge="start" color="inherit" aria-label="open drawer">
                    <MenuIcon />
                </IconButton>

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
            </Toolbar>
        </AppBar>
    );
}
