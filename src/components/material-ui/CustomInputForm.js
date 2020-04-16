import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const CustomInputForm = props => {
    const classes = useStyles();
    const {
        data,
        actionCallback,
        optionsEnabled,
        inputData,
        setInputData,
        customField = [],
        setCustomField,
    } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [addCustomField, setAddCustomField] = useState('');

    useEffect(() => {
        if (isJsonType(data)) setInputData(data);
        else {
            let obj = {};
            data.forEach(item => {
                obj[item.idLabel] = item.defaultValue;
            });
            setInputData(obj);
        }
    }, [setInputData, data]);

    const handleChange = event => {
        setInputData({ ...inputData, [event.target.name]: event.target.value });
    };

    const handleDateChange = (name, date) => {
        setInputData({ ...inputData, [name]: date });
    };

    const addInputField = () => {
        if (addCustomField && !inputData.hasOwnProperty(addCustomField)) {
            setOpenDialog(false);
            let temp = {
                label: addCustomField,
                idLabel: addCustomField,
                defaultValue: '',
                type: 'text',
                placeholder: '',
                disabled: false,
                custom: true,
            };
            let tempInputData = inputData;
            tempInputData[addCustomField] = '';
            setCustomField([...customField, temp]);
            setInputData(tempInputData);
        }
    };

    return (
        <div style={{ flex: 1 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    fullWidth={true}
                    maxWidth={'sm'}
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                >
                    <DialogTitle id="form-dialog-title">Tambah Label Input</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={!!(inputData && inputData.hasOwnProperty(addCustomField))}
                            value={inputData ? addCustomField : ''}
                            autoFocus
                            margin="dense"
                            autoComplete="off"
                            id="inputLabel"
                            label="Nama Label"
                            type="text"
                            fullWidth
                            helperText="Nama field harus unik"
                            onChange={event => setAddCustomField(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => setOpenDialog(false)}>
                            Batal
                        </Button>
                        <Button color="primary" onClick={addInputField}>
                            Tambah
                        </Button>
                    </DialogActions>
                </Dialog>

                <div className={classes.options}>
                    <div className={classes.optionsTitle} />
                    <Tooltip title="tambah label" enterDelay={500} leaveDelay={100} arrow>
                        <span>
                            <IconButton
                                href=""
                                disabled={optionsEnabled && !optionsEnabled.add}
                                onClick={() => setOpenDialog(true)}
                            >
                                <AddIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="edit input" enterDelay={500} leaveDelay={100} arrow>
                        <span>
                            <IconButton
                                href=""
                                disabled={optionsEnabled && !optionsEnabled.edit}
                                onClick={actionCallback}
                            >
                                <EditIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>

                <form className={classes.root} noValidate autoComplete="off">
                    {(isArrayType(data) ? data : Object.keys(data))
                        .concat(customField)
                        .map((item, idx) => (
                            <FormControl key={item.idLabel || item} fullWidth>
                                <FormControlLabel
                                    value={
                                        inputData
                                            ? isArrayType(data)
                                                ? inputData[item['idLabel']]
                                                : inputData[item] || ''
                                            : ''
                                    }
                                    labelPlacement="start"
                                    disabled={isArrayType(data) ? item.disabled : true}
                                    htmlFor={item.idLabel || item}
                                    label={
                                        <div className={classes.inputLabel}>
                                            <label htmlFor={item.idLabel || item}>
                                                {item.label || item}
                                            </label>
                                        </div>
                                    }
                                    control={
                                        item.type === 'date' ? (
                                            <KeyboardDatePicker
                                                name={item.idLabel || item}
                                                disableToolbar
                                                variant="inline"
                                                format="dd MMMM yyyy"
                                                margin="normal"
                                                className={classes.input}
                                            />
                                        ) : (
                                            <Input
                                                name={item.idLabel || item}
                                                multiline
                                                rowsMax="4"
                                                placeholder={item.placeholder}
                                                className={classes.input}
                                            />
                                        )
                                    }
                                    className={classes.formControlLabel}
                                    onChange={
                                        item.type === 'date'
                                            ? date => handleDateChange(item.idLabel, date)
                                            : handleChange
                                    }
                                />
                                {item.custom && (
                                    <FormHelperText>
                                        <Link
                                            component="button"
                                            onClick={event => {
                                                event.preventDefault();
                                                let tempCustomField = customField;
                                                let tempInputData = inputData;
                                                delete tempInputData[item.idLabel];
                                                // console.log('LALALALA first ', tempInputData);  // todo
                                                tempCustomField.splice(idx - data.length, 1);
                                                // console.log('LALALALA', tempCustomField);
                                                setCustomField(tempCustomField);
                                                setInputData(tempInputData);
                                            }}
                                        >
                                            Hapus
                                        </Link>
                                    </FormHelperText>
                                )}
                            </FormControl>
                        ))}
                </form>
            </MuiPickersUtilsProvider>
        </div>
    );
};

CustomInputForm.propTypes = {
    optionsEnabled: PropTypes.object,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    actionCallback: PropTypes.func,
    inputData: PropTypes.object.isRequired,
    setInputData: PropTypes.func.isRequired,
    customField: PropTypes.array,
    setCustomField: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    optionsTitle: {
        flex: 1,
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
    },
    formControlLabel: {
        justifyContent: 'flex-end',
        marginRight: theme.spacing(1),
        marginLeft: 0,
    },
    inputLabel: {
        margin: theme.spacing(1, 3, 1, 0),
        width: 'auto',
        maxWidth: theme.spacing(50),
    },
    input: {
        flex: 1,

        marginRight: theme.spacing(3),
    },
}));

let isArrayType = obj => {
    return obj.constructor === [].constructor;
};

let isJsonType = (obj) => {
    return  obj.constructor === {}.constructor;
};


export default CustomInputForm;