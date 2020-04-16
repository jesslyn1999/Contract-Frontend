import React, { useState } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import apis from 'apis';
import {
    TemplateCreatorHeader,
    TemplateHeaderContainer,
} from 'scenes/template-ui/create-new-template/CreateNewTemplateStyle';
import Button from '@material-ui/core/Button';
import SectionInsertor from 'components/section_inserter/SectionInserter';
import CKEditor from '@ckeditor/ckeditor5-react';
import CKEditorsBuild from 'ckeditor5-super-build-ppl';
import { withRouter } from 'react-router-dom';
import 'scenes/template-ui/create-new-template/CreateNewTemplate.scss';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const SelectTemplateDialog = props => {
    const classes = useStyles();
    const { open, setOpen, actionCallback } = props;
    const [templateData, setTemplateData] = useState({ title: '', description: '', content: '' });
    const [myEditor, setMyEditor] = useState('');

    const insertionCallbackCreator = editor => (content, data = {}) => {
        editor.setData('');
        setTemplateData(data);
        const htmlDP = editor.data.processor;
        const viewFragment = htmlDP.toView(content + '<p>&nbsp;</p>');
        const modelFragment = editor.data.toModel(viewFragment);
        const position = editor.model.document.selection.getFirstPosition();
        editor.model.insertContent(modelFragment, position);
        editor.model.change(writer => {
            writer.setSelection(writer.createPositionAt(editor.model.document.getRoot(), 'end'));
        });
        editor.editing.view.focus();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Template Data
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="new_template_container">
                <TemplateHeaderContainer>
                    <TemplateCreatorHeader>Template Selector</TemplateCreatorHeader>
                    <div style={{ flex: 1 }} />
                    <Button
                        href=""
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if (templateData._id) {
                                actionCallback({
                                    id: templateData._id,
                                    title: templateData.title,
                                    description: templateData.description,
                                });
                            } else alert('Harus memilih template!');
                        }}
                    >
                        Next&ensp;
                        <ArrowForwardIcon />
                    </Button>
                </TemplateHeaderContainer>

                <div className="main_container">
                    <div className="section_insertor_container">
                        <SectionInsertor
                            header="Templates"
                            insertionCallback={insertionCallbackCreator(myEditor)}
                            getContents={apis.template.getAllTemplates}
                        />
                    </div>
                    <div className="ck_editor_container_template">
                        <div className="ck_editor_template_toolbar"></div>
                        <div className="ck_editor_template_editable">
                            <CKEditor
                                editor={CKEditorsBuild.DocumentEditor}
                                data={templateData.content}
                                onInit={editor => {
                                    document
                                        .querySelector('.ck_editor_template_toolbar')
                                        .appendChild(editor.ui.view.toolbar.element);
                                    editor.isReadOnly = true;
                                    setMyEditor(editor);
                                    editor.editing.view.focus();
                                }}
                                onChange={(_, editor) => {
                                    const data = editor.getData();
                                    setTemplateData(old => ({ ...old, content: data }));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

SelectTemplateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    actionCallback: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default withRouter(SelectTemplateDialog);