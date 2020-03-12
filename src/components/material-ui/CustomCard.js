import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles( {
    root: {
      height: "100%",
      maxHeight: 300,
    },
    title: {
        color: "#003366",
        fontWeight: "bold",
    },
    button: {
        color: "#003366",
    }
});

export default function DocumentCard(props) {
    const {
        title,
        content
    } = props;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    classes = {{
                        title: classes.title,
                    }}
                    action={
                        <IconButton aria-label="delete">
                            <Close />
                        </IconButton>
                    }
                    title = {title}
                />
                <CardContent>
                    <Typography noWrap variant="body2" component="p" gutterBottom>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" className={classes.button}>Edit</Button>
            </CardActions>
        </Card>
    );
}

DocumentCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}
