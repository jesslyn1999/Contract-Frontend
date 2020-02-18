import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    appBar: {
        background: '#fff',
        color: '#000',
    },
    toolbar: {
        minWidth: theme.spacing(90),
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
        margin: theme.spacing(0, 2, 1, 0),
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
        marginLeft: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: theme.spacing(2),
    },
}));


export default function CustomNavbar(props) {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon/>
                </IconButton>

                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        fullWidth
                        placeholder="Searching...."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
                </div>

            </Toolbar>
        </AppBar>
    );
}
