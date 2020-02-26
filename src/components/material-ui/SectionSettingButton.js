import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { deleteSectionById } from 'apis/Section';

function createData(name, key, goToPath) {
    return { name, key, goToPath };
}

const options = [
    createData('Edit', 'edit', ''),
    createData('Delete', 'delete', ''),
];

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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="setting" enterDelay={500} leaveDelay={100} arrow>
                <IconButton href="" aria-label="setting button" component="span" onClick={handleClick}>
                    <SettingsIcon/>
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
                    <ListItem component="div" button key="edit" className={classes.listItemButton}
                    >
                        <ListItemText primary="Edit"/>
                    </ListItem>
                    <ListItem component="div" button key="delete" className={classes.listItemButton}
                              onClick={() => {
                                  deleteSectionById(rowId)
                                      .then(() => {
                                          alert('One Section Deleted');
                                      })
                                      .catch(() => {
                                          alert('Can\'t be deleted !');
                                      })
                                      .finally(() => {
                                          window.location.reload();
                                      });

                              }}
                    >
                        <ListItemText primary="Delete"/>
                    </ListItem>
                </List>
            </Popover>
        </React.Fragment>
    );
}
