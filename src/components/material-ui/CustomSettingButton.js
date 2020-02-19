import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function createData(name, goToPath) {
    return { name, goToPath };
}

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const options = [
    createData('Edit', ''),
    createData('Delete', ''),
];

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        maxWidth: theme.spacing(30),
    },
    listItemLink: {
        padding: theme.spacing(0, 3),
    },
    popover: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    }
}));

export default function CustomSettingButton() {
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
            <IconButton href="" aria-label="setting button" component="span" onClick={handleClick}>
                <SettingsIcon/>
            </IconButton>
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
                    {/*<ListItem button>*/}
                    {/*    <ListItemText primary="Trash" />*/}
                    {/*</ListItem>*/}
                    {options.map(item => (
                        <ListItemLink href={item.goToPath} className={classes.listItemLink}>
                            <ListItemText primary={item.name}/>
                        </ListItemLink>
                    ))}
                </List>
            </Popover>
        </React.Fragment>
    );
}
