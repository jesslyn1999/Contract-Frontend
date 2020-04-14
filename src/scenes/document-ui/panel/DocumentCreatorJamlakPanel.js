import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomExpansionPanel from 'components/material-ui/CustomExpansionPanel';
import CustomInputForm from 'components/material-ui/CustomInputForm';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpbbjDialog from 'scenes/spbbj/dialog/SpbbjDialog';
import apis from 'apis';
import SelectTemplateDialog from 'scenes/template-ui/select-template/SelectTemplateDialog';

function DocumentCreatorJamlakPanel(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [openSpbbjDialog, setOpenSpbbjDialog] = useState(false);
    const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
    const [baseTemplateData, setBaseTemplateData] = useState({});
    const [inputTemplateData, setInputTemplateData] = useState({});
    const [baseSpbbjData, setBaseSpbbjData] = useState({});
    const [inputSpbbjData, setInputSpbbjData] = useState({});
    const [baseJamlakData, setBaseJamlakData] = useState({});
    const [inputJamlakData, setInputJamlakData] = useState({});

    const getDetailsTemplatePanel = () => (
        <CustomInputForm
            optionsEnabled={{ edit: true, add: false }}
            data={baseTemplateData}
            inputData={inputTemplateData}
            setInputData={setInputTemplateData}
            actionCallback={() => setOpenTemplateDialog(true)}
        />
    );
    const getDetailsSpbbjPanel = () => (
        <CustomInputForm
            optionsEnabled={{ edit: true, add: false }}
            data={baseSpbbjData}
            inputData={inputSpbbjData}
            setInputData={setInputSpbbjData}
            actionCallback={() => setOpenSpbbjDialog(true)}
        />
    );
    const getDetailsJamlakPanel = () => (
        <CustomInputForm
            optionsEnabled={{ edit: false, add: false }}
            data={baseJamlakData}
            inputData={inputJamlakData}
            setInputData={setInputJamlakData}
        />
    );

    return (
        <div className={classes.root}>
            <CustomExpansionPanel
                title="Template Data"
                getDetails={getDetailsTemplatePanel}
                {...props}
            />
            <CustomExpansionPanel title="Spbbj Data" getDetails={getDetailsSpbbjPanel} {...props} />
            <CustomExpansionPanel
                title="Jamlak Data"
                getDetails={getDetailsJamlakPanel}
                {...props}
            />

            <SelectTemplateDialog
                open={openTemplateDialog}
                setOpen={setOpenTemplateDialog}
                actionCallback={data => {
                    setBaseTemplateData(data);
                    setOpenTemplateDialog(false);
                }}
            />
            <SpbbjDialog
                open={openSpbbjDialog}
                setOpen={setOpenSpbbjDialog}
                actionCallback={rowData => {
                    setBaseSpbbjData(rowData);
                    setOpenSpbbjDialog(false);
                    setIsLoading(true);
                    apis.jamlak
                        .getJamlakBySppbj(rowData['nomor_sppbj'] || 'sfsdf32') //todo nomor sppbj
                        .then(({ data }) => {
                            if (data.length > 0) {
                                setBaseJamlakData(data[0]);
                            } else {
                                console.log('jamlak data length: ', data.length);
                            }
                        })
                        .catch()
                        .finally(() => setIsLoading(false));
                }}
            />

            <Button
                href=""
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={() => {
                    setIsLoading(true);
                    apis.spbbj
                        .generateSpbbjDoc({
                            id_template: inputTemplateData.id,
                            data_pemenang: inputSpbbjData,
                            data_form: inputJamlakData,
                        })
                        .finally(() => setIsLoading(false));
                }}
                className={classes.submitButton}
            >
                Proses Dokumen Jamlak
            </Button>
        </div>
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

DocumentCreatorJamlakPanel.propTypes = {
    candidateData: PropTypes.object,
    templateData: PropTypes.object,
};


export default DocumentCreatorJamlakPanel;