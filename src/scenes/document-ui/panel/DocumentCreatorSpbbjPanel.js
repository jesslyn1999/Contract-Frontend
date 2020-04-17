import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomExpansionPanel from 'components/material-ui/CustomExpansionPanel';
import CustomInputForm from 'components/material-ui/CustomInputForm';
import { makeStyles } from '@material-ui/core/styles';
import CandidateDialog from 'scenes/candidates-ui/dialog/CandidateDialog';
import SelectTemplateDialog from 'scenes/template-ui/select-template/SelectTemplateDialog';
import apis from 'apis';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function DocumentCreatorSpbbjPanel(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [openCandidateDialog, setOpenCandidateDialog] = useState(false);
    const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
    const [baseCandidateData, setBaseCandidateData] = useState({});
    const [inputCandidateData, setInputCandidateData] = useState({});
    const [baseTemplateData, setBaseTemplateData] = useState({});
    const [inputTemplateData, setInputTemplateData] = useState({});
    const [baseTagData, setBaseTagData] = useState({});
    const [inputTagData, setInputTagData] = useState({});
    const getDetailsCandidatePanel = () => (
        <CustomInputForm
            optionsEnabled={{ edit: true, add: false }}
            data={baseCandidateData}
            inputData={inputCandidateData}
            setInputData={setInputCandidateData}
            actionCallback={() => setOpenCandidateDialog(true)}
        />
    );
    const getDetailsTemplatePanel = () => (
        <CustomInputForm
            optionsEnabled={{ edit: true, add: false }}
            data={baseTemplateData}
            inputData={inputTemplateData}
            setInputData={setInputTemplateData}
            actionCallback={() => setOpenTemplateDialog(true)}
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
                SPPBJ Generator
            </Typography>
            <Box my={8} />
            <CustomExpansionPanel
                title="Template Data"
                getDetails={getDetailsTemplatePanel}
                {...props}
            />
            <CustomExpansionPanel
                title="Candidate Data"
                getDetails={getDetailsCandidatePanel}
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
            <CandidateDialog
                open={openCandidateDialog}
                setOpen={setOpenCandidateDialog}
                actionCallback={data => {
                    setBaseCandidateData(data);
                    setOpenCandidateDialog(false);
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
                            data_pemenang: inputCandidateData,
                            data_form: inputTagData,
                        }) // todo
                        .finally(() => setIsLoading(false));
                }}
                className={classes.submitButton}
            >
                Proses Dokumen Spbbj
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

DocumentCreatorSpbbjPanel.propTypes = {
    candidateData: PropTypes.object,
    templateData: PropTypes.object,
};

export default DocumentCreatorSpbbjPanel;
