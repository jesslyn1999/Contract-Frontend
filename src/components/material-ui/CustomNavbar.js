import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomSideBarLeft from 'components/material-ui/CustomSideBarLeft';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import useTheme from '@material-ui/core/styles/useTheme';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    appBar: {
        background: '#fff',
        minWidth: theme.spacing(90),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    toolbar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: theme.spacing(126),
    },
    profileName: {
        margin: theme.spacing(0, 2),
        marginTop: 'auto',
        marginBottom: 'auto',
    },
}));

export default function CustomNavbar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawerLeft, setOpenDrawerLeft] = useState(false);

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpenDrawerLeft(true)}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{ flex: 1 }} />
                <Box display="flex">
                    <Avatar alt="Jesslyn" />
                    <Typography
                        variant="subtitle1"
                        component="div"
                        align="center"
                        className={classes.profileName}
                    >
                        Admin
                    </Typography>
                    <IconButton href="" style={{ color: theme.palette.primary.contrastText }}>
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <CustomSideBarLeft
                openDrawer={openDrawerLeft}
                setOpenDrawer={setOpenDrawerLeft}
                sideBarTexts={[
                    'Home',
                    'Sections',
                    'Templates',
                    'SPPBJ',
                    'Candidates',
                    'SPPBJ Document Generator',
                    'Jamlak Document Generator',
                ]}
                sideBarLinks={[
                    '/home',
                    '/section',
                    '/template',
                    '/sppbj',
                    '/candidate',
                    '/create-spbbj',
                    '/create-jamlak',
                ]}
            />
        </AppBar>
    );
}
