import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CustomNavbar from 'components/material-ui/CustomNavbar';
import CKEditor from '@ckeditor/ckeditor5-react';
import CKEditorsBuild from 'ckeditor5-super-build-ppl';
import apis from 'apis';
import './CreateNewTemplate.scss';
import 'react-progress-button/react-progress-button.css';
import LoadingButton from 'components/loading-button/LoadingButton';
import SectionInsertor from 'components/section_inserter_original/SectionInserter';
import {
    TemplateCreatorHeader,
    TemplateNameInput,
    TemplateHeaderContainer,
} from './CreateNewTemplateStyle';
import PropTypes from 'prop-types';
import themePage from 'scenes/theme';

const insertionCallbackCreator = editor => content => {
    const htmlDP = editor.data.processor;
    const viewFragment = htmlDP.toView(content + '<p>&nbsp;</p>');
    const modelFragment = editor.data.toModel(viewFragment);
    const position = editor.model.document.selection.getFirstPosition();
    editor.model.insertContent(modelFragment, position);
    editor.model.change(writer => {
        writer.setSelection(writer.createPositionAt(editor.model.document.getRoot(), 'end'));
    });
    editor.editing.view.focus();
    // const el = editor.model.document.selection.getFirstPosition();
};

const CreateNewTemplate = props => {
    const { data, setPage } = props;
    const [templateData, setTemplateData] = useState();
    const [myEditor, setMyEditor] = useState();
    const sectionInsertorComponent = useMemo(
        () => <SectionInsertor insertionCallback={insertionCallbackCreator(myEditor)} />,
        [myEditor],
    );

    useEffect(() => {
        if (data) {
            setTemplateData(data);
        } else {
            setTemplateData({ title: '', description: '', content: '' });
        }
    }, [data]);

    return (
        <>
            {!templateData ? null : (
                <ThemeProvider theme={themePage}>
                    <CustomNavbar />
                    <div className="new_template_container">
                        <TemplateHeaderContainer>
                            <TemplateCreatorHeader>Template Creator</TemplateCreatorHeader>
                            <TemplateNameInput
                                placeholder="Judul template"
                                value={templateData.title}
                                onChange={e => {
                                    let newTitle = e.target.value;
                                    setTemplateData(old => ({ ...old, title: newTitle }));
                                }}
                            />
                            <TemplateNameInput
                                placeholder="Deskripsi template"
                                value={templateData.description}
                                onChange={e => {
                                    let newDescription = e.target.value;
                                    setTemplateData(old => ({
                                        ...old,
                                        description: newDescription,
                                    }));
                                }}
                            />
                            <LoadingButton
                                onClick={() =>
                                    new Promise((resolve, reject) => {
                                        setPage();
                                        resolve();
                                    })
                                }
                            >
                                Back
                            </LoadingButton>

                            <LoadingButton
                                onClick={() => apis.template.addNewTemplate(templateData)}
                            >
                                SAVE
                            </LoadingButton>
                        </TemplateHeaderContainer>

                        <div className="main_container">
                            <div className="section_insertor_container">
                                {sectionInsertorComponent}
                            </div>
                            <div className="ck_editor_container_template">
                                <div className="ck_editor_template_toolbar"></div>
                                <div className="ck_editor_template_editable">
                                    <CKEditor
                                        data={templateData.content}
                                        onInit={editor => {
                                            document
                                                .querySelector('.ck_editor_template_toolbar')
                                                .appendChild(editor.ui.view.toolbar.element);
                                            setMyEditor(editor);
                                            console.log('Editor is ready to use!', editor);
                                            editor.editing.view.focus();
                                        }}
                                        onChange={(_, editor) => {
                                            const contentData = editor.getData();
                                            setTemplateData(old => ({
                                                ...old,
                                                content: contentData,
                                            }));
                                            console.log(templateData);
                                        }}
                                        editor={CKEditorsBuild.DocumentEditor}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            )}
        </>
    );
};

CreateNewTemplate.propTypes = {
    setPage: PropTypes.func.isRequired,
};

export default CreateNewTemplate;
