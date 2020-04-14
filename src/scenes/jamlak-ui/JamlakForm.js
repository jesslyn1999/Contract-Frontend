import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import themePage from 'scenes/theme';
import CustomInputForm from 'components/material-ui/CustomInputForm';
import apis from 'apis';

const baseField = [
    {
        label: 'Nomor Jaminan',
        idLabel: 'no_jamlak',
        defaultValue: '',
        type: 'text',
        placeholder: '',
        disabled: false,
    },
    {
        label: 'Pemberi Jaminan',
        idLabel: 'pemberiJaminan',
        defaultValue: '',
        type: 'text',
        placeholder: '',
        disabled: false,
    },
    {
        label: 'Tanggal Pembuatan Jaminan',
        idLabel: 'tgl_pembuatan',
        defaultValue: new Date(),
        type: 'date',
        placeholder: '',
        disabled: false,
    },
    {
        label: 'Tanggal Jatuh Tempo Jaminan',
        idLabel: 'tgl_jatuh_tempo',
        defaultValue: new Date(),
        type: 'date',
        placeholder: '',
        disabled: false,
    },
    {
        label: 'Nama Bank',
        idLabel: 'nama_bank',
        defaultValue: '',
        type: 'text',
        placeholder: '',
        disabled: false,
    },
    {
        label: 'Alamat Bank',
        idLabel: 'alamat_bank',
        defaultValue: '',
        type: 'text',
        placeholder: '',
        disabled: false,
    },
    {
        label: 'Nominal Garansi',
        idLabel: 'nominal_garansi',
        defaultValue: '',
        type: 'number',
        placeholder: '',
        disabled: false,
    },
];

function JamlakForm(props) {
    const classes = useStyles();
    const { sppbjData } = props.location;
    const history = useHistory();
    const [inputBaseField, setInputBaseField] = useState(baseField);

    useEffect(() => {
        setInputBaseField([
            {
                label: 'Nomor SPPBJ',
                idLabel: 'nomor_sppbj',
                defaultValue: sppbjData ? sppbjData['nomor_sppbj'] : '',
                type: 'text',
                placeholder: '',
                disabled: false,  //todo true
            },
        ].concat(baseField))
    }, [sppbjData]);

    const [isLoading, setIsLoading] = useState(false);
    const [customField, setCustomField] = useState([]);
    const [inputData, setInputData] = useState({});
    const redirectPage = () => {
        alert('Harus memilih satu data sppbj');
        return <Redirect to="/document" />;
    };
    return (
        <React.Fragment>
            {!sppbjData ? (
                redirectPage()
            ) : (
                <ThemeProvider theme={themePage}>
                    <CustomNavbar />
                    <div className={classes.root}>
                        <CustomInputForm
                            optionsEnabled={{ edit: false, add: true }}
                            data={inputBaseField}
                            inputData={inputData}
                            setInputData={setInputData}
                            customField={customField}
                            setCustomField={setCustomField}
                        />
                        <Button
                            href=""
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            onClick={() => {
                                setIsLoading(true);
                                apis.jamlak
                                    .addNewJamlak(inputData)
                                    .then(() => alert('telah berhasil disimpan'))
                                    .catch(err => alert('gagal menyimpan : ' + err.message))
                                    .finally(() => {
                                        setIsLoading(false);
                                        history.push('/document');
                                    });
                            }}
                            className={classes.submitButton}
                        >
                            SIMPAN
                        </Button>
                    </div>
                </ThemeProvider>
            )}
        </React.Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
        marginRight: 'auto',
        marginLeft: 'auto',
        minWidth: theme.spacing(90),
        maxWidth: theme.spacing(120),
        textAlign: 'center',
    },
    submitButton: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(5),
    },
}));

export default JamlakForm;
