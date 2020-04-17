import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const CustomExpansionPanel = props => {
    const { title, getDetails } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary href="" expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>{getDetails()}</ExpansionPanelDetails>
            </ExpansionPanel>
            <Box my={2} />
        </React.Fragment>
    );
};

CustomExpansionPanel.propTypes = {
    title: PropTypes.string.isRequired,
    getDetails: PropTypes.func.isRequired,
};


export default CustomExpansionPanel;