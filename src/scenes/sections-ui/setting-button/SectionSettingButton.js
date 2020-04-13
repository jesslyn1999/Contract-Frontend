import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { deleteSectionById, getSectionById } from 'apis/Section';
import CreateNewSection from 'scenes/sections-ui/create-new-section/CreateNewSection';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        maxWidth: theme.spacing(30),
    },
    listItemButton: {
        padding: theme.spacing(0, 3),
    },
    popover: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    },
}));

export default function SectionSettingButton(props) {
    const { rowId } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState({ _id: '', title: '', description: '', content: '' });

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="setting" enterDelay={500} leaveDelay={100} arrow>
                <IconButton
                    href=""
                    aria-label="setting button"
                    component="span"
                    onClick={handleClick}
                >
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Popover
                id={Boolean(anchorEl) ? 'popover-setting' : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                className={classes.popover}
            >
                <List component="nav" aria-label="setting options" className={classes.list}>
                    <ListItem
                        component="div"
                        button
                        key="edit"
                        onClick={() => {
                            getSectionById(rowId)
                                .then(res => {
                                    setData({ ...res.data, id: rowId });
                                })
                                .catch(() => {
                                    alert("Can't be Clicked!");
                                });
                        }}
                        className={classes.listItemButton}
                    >
                        <CreateNewSection
                            triggerContent={() => {
                                return <ListItemText primary="Edit" />;
                            }}
                            data={data}
                        />
                    </ListItem>
                    <ListItem
                        component="div"
                        button
                        key="delete"
                        className={classes.listItemButton}
                        onClick={() => {
                            deleteSectionById(rowId)
                                .then(() => {
                                    alert('One Section Deleted');
                                })
                                .catch(() => {
                                    alert("Can't be Deleted !");
                                })
                                .finally(() => {
                                    window.location.reload();
                                });
                        }}
                    >
                        <ListItemText primary="Delete" />
                    </ListItem>
                </List>
            </Popover>
        </React.Fragment>
    );
}
