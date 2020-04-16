import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import CandidateTable from 'scenes/candidates-ui/table/CandidateTable';

function CandidateDialog(props) {
    const classes = useStyles();
    const { open, setOpen, actionCallback } = props;
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Candidate Data
                    </Typography>
                </Toolbar>
            </AppBar>
            <CandidateTable
                actionSettingButton={props => (
                    <DialogSettingButton actionCallback={actionCallback} {...props} />
                )}
            />
        </Dialog>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

CandidateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    actionCallback: PropTypes.func.isRequired,
};

function DialogSettingButton(props) {
    const { candidateData, actionCallback } = props;

    return (
        <React.Fragment>
            <Tooltip title="setting" enterDelay={500} leaveDelay={100} arrow>
                <IconButton href="" aria-label="setting button" component="span" onClick={() => actionCallback(candidateData)}>
                    <DoubleArrowIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

DialogSettingButton.propTypes = {
    candidateData: PropTypes.object.isRequired,
    actionCallback: PropTypes.func.isRequired,
};

export default CandidateDialog;
