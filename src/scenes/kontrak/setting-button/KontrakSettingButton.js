import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { Link as RouterLink } from 'react-router-dom';

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

function ListItemLink(props) {
    const { primary, to, className, rowId, rowData } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                <RouterLink
                    to={{
                        pathname: to,
                        sppbjId: rowId,
                        sppbjData: rowData,
                    }}
                    ref={ref}
                    {...itemProps}
                />
            )),
        [rowId, rowData, to],
    );

    return (
        <li>
            <ListItem button component={renderLink} className={className}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    rowId: PropTypes.string.isRequired,
};

export default function KontrakSettingButton(props) {
    const { rowId, rowData } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

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
                    <ListItemLink
                        className={classes.listItemButton}
                        primary="Tambah Data Jamlak"
                        to="/jamlak-form"
                        rowId={rowId}
                        rowData={rowData}
                    />
                </List>
            </Popover>
        </React.Fragment>
    );
}

KontrakSettingButton.propTypes = {
    rowId: PropTypes.string.isRequired,
};

