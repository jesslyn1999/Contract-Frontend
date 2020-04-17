import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomExpansionPanel from 'components/material-ui/CustomExpansionPanel';
import CustomInputForm from 'components/material-ui/CustomInputForm';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
    const [baseTagData, setBaseTagData] = useState({});
    const [inputTagData, setInputTagData] = useState({});

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
    const getDetailsTagsPanel = () => (
        <CustomInputForm
            optionsEnabled={{ edit: false, add: false }}
            data={baseTagData}
            inputData={inputTagData}
            setInputData={setInputTagData}
        />
    );

    return (
        <div className={classes.root}>
            <Typography component="h5" variant="h5" paragraph>
                Contract Generator
            </Typography>
            <Box my={8} />
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
            <CustomExpansionPanel title="Data Sets" getDetails={getDetailsTagsPanel} {...props} />

            <SelectTemplateDialog
                open={openTemplateDialog}
                setOpen={setOpenTemplateDialog}
                actionCallback={templateData => {
                    const { id } = templateData;
                    let obj = [];
                    setBaseTemplateData(templateData);
                    setOpenTemplateDialog(false);
                    setIsLoading(true);
                    apis.form
                        .getAllTagsByTemplateId(id)
                        .then(({ data }) => {
                            data.forEach(item =>
                                obj.push({
                                    label: item,
                                    idLabel: item,
                                    defaultValue: '',
                                    type: 'text',
                                    placeholder: '',
                                    disabled: false,
                                }),
                            );
                            setBaseTagData(obj);
                        })
                        .catch()
                        .finally(() => setIsLoading(false));
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
                        .getJamlakBySppbj(encodeURIComponent(rowData['NO_SPPBJ']) || '')
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
                    apis.contract
                        .generateContractDoc({
                            id_template: inputTemplateData.id,
                            id_sppbj: inputSpbbjData._id,
                            id_jamlak: inputJamlakData._id,
                            data_form: inputTagData,
                        })
                        .finally(() => setIsLoading(false));
                }}
                className={classes.submitButton}
            >
                Proses Dokumen Kontrak
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