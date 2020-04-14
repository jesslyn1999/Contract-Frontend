import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomExpansionPanel from 'components/material-ui/CustomExpansionPanel';
import CustomInputForm from 'components/material-ui/CustomInputForm';
import { makeStyles } from '@material-ui/core/styles';
import CandidateDialog from 'scenes/candidates-ui/dialog/CandidateDialog';
import SelectTemplateDialog from 'scenes/template-ui/select-template/SelectTemplateDialog';
import apis from 'apis';
import Button from '@material-ui/core/Button';

const dummyData = [
    {
        label:
            'Input anything 1 bla bla Input anything 1 bla bla Input anything 1 bla bla Input anything 1 bla bla Input anything 1 bla bla Input anything 1 bla bla',
        idLabel: 'input',
        defaultValue: 'Hello world',
        type: 'text',
        placeholder: '',
        disabled: false,
    },
    {
        label: 'Input anything 2',
        idLabel: 'input2',
        defaultValue: 'Hello world 2',
        type: 'text',
        placeholder: 'Placeholder',
        disabled: false,
    },
    {
        label: 'Input anything 3',
        idLabel: 'input3',
        defaultValue: 'Hello world 3',
        type: 'text',
        placeholder: 'Placeholder 3',
        disabled: true,
    },
];

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
    const dummy = () => <CustomInputForm data={dummyData} />;
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
    return (
        <div className={classes.root}>
            {/*<CustomExpansionPanel title="Testing" getDetails={dummy} {...props} />*/}
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

            <CandidateDialog
                open={openCandidateDialog}
                setOpen={setOpenCandidateDialog}
                actionCallback={data => {
                    setBaseCandidateData(data);
                    setOpenCandidateDialog(false);
                }}
            />
            <SelectTemplateDialog
                open={openTemplateDialog}
                setOpen={setOpenTemplateDialog}
                actionCallback={data => {
                    setBaseTemplateData(data);
                    setOpenTemplateDialog(false);
                }}
            />

            <Button
                href=""
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={() => {
                    setIsLoading(true);
                    apis.spbbj.generateSpbbjDoc({
                        id_template: inputTemplateData.id,
                        data_pemenang: inputCandidateData,
                        data_form: inputTagData,
                    }) // todo
                        .finally(() => setIsLoading(false))
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