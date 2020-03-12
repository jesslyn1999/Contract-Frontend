import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CustomCard from 'components/material-ui/CustomCard';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5, 0),
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
    },
    grid: {
        padding: theme.spacing(4),
    }
}));

const documents = [
    ['SPPBJ1', 'Dokumen SPPBJ 1 bang'],
    ['SPPBJ2', 'Dokumen SPPBJ 2 bang jasdhfkjahdjkf jkasdhf kzjhfkjdhaf k jasdh'],
    ['SPPBJ3', 'Dokumen SPPBJ 3 gan'],
    ['SPPBJ4', 'Dokumen SPPBJ 4 gan'],
];

function DocumentsPage() {
    const classes = useStyles();
    return (
        <div>
            <CustomNavbar handleSearch={() => {}} />
            <div className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    <Box fontWeight="fontWeightBold">
                        Daftar Dokumen
                    </Box>
                </Typography>
                <Grid container spacing={3}>
                    {documents.map(row => (
                        <Grid className={classes.grid} item xs={4}>
                            <CustomCard title={row[0]} content={row[1]} />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Grid container justify = "center">
                <Pagination centered count={1} color="primary" />
            </Grid>
        </div>
    );
}

export default withRouter(DocumentsPage);
