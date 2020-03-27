import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CustomCard from 'components/material-ui/CustomCard';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import { getAllTemplates } from 'apis/Template';
import themePage from 'scenes/theme';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5, 0),
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
    },
    grid: {
        padding: theme.spacing(4),
    },
    title: {
        flex: '1 1 100%',
    },
    toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
}));

function DocumentsPage() {
    const classes = useStyles();
    const [templates, setTemplates] = React.useState([]);

    React.useEffect(() => {
        const fetchTemplates = async () => {
            getAllTemplates()
                .then(res => {
                    const { data } = res;
                    const templatesData = data.map(item => ({
                        _id: item['_id'],
                        title: item['title'],
                        description: item['description'],
                        content: item['content'],
                    }));
                    setTemplates(templatesData);
                })
                .catch(err => {
                    console.log('Error:', err);
                });
        };
        fetchTemplates();
    }, []);

    return (
        <ThemeProvider theme={themePage}>
            <CustomNavbar />
            <div className={classes.root}>
                <Toolbar className={clsx(classes.toolbar, null)}>
                    <Typography className={classes.title} variant="h4" gutterBottom>
                        <Box fontWeight="fontWeightBold">Daftar Template</Box>
                    </Typography>
                    <Tooltip title="Add Template" enterDelay={500} leaveDelay={100}>
                        <IconButton href="" aria-label="Add Template">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>

                <Grid container spacing={3}>
                    {templates.map(row => (
                        <Grid key={row._id} className={classes.grid} item xs={4}>
                            <CustomCard
                                title={row.title}
                                content={row.description}
                                templateId={row._id}
                            />
                        </Grid>
                    ))}
                    {console.log(templates)}
                </Grid>
            </div>
            <Grid container justify="center">
                <Pagination centered="true" count={1} color="primary" />
            </Grid>
        </ThemeProvider>
    );
}

export default withRouter(DocumentsPage);
