import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import { Drawer } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(theme => ({
    list: {
        width: theme.spacing(30),
    },
    listItem: {
        '&:hover': {
            background: '#008AC7',
        },
    },
    headerText: {
        // fontSize: '2000px',
        // fontWeight: theme.spacing(500),
        color: '#000',
    },
    listHeader: {
        backgroundColor: theme.palette.primary.contrastText,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    drawerPaper: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

export default function CustomSideBarLeft(props) {
    const classes = useStyles();
    const { openDrawer, setOpenDrawer } = props;

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List style={{ paddingTop: 0 }}>
                <ListItem className={classes.listHeader}>
                    <ListItemIcon>
                        <Avatar
                            alt="ITB"
                            src={process.env.PUBLIC_URL + '/images/logo-itb/logo-itb-256px.png'}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Direktorat Logistik" className={classes.headerText} />
                </ListItem>
                <Divider />
                {['Home', 'Document'].map((text, index) => (
                    <ListItem button key={text} className={classes.listItem}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Drawer
            open={openDrawer}
            onClose={toggleDrawer(false)}
            classes={{ paper: classes.drawerPaper }}
        >
            {sideList()}
        </Drawer>
    );
}

CustomSideBarLeft.propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    setOpenDrawer: PropTypes.func.isRequired,
};