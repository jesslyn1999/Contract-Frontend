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
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import '../Template.scss';
import themePage from 'scenes/theme';
import { ThemeProvider } from '@material-ui/styles';

const SelectTemplatePage = props => {
    const { candidateData } = props.location;
    const [templateData, setTemplateData] = useState({ title: '', description: '', content: '' });
    const [myEditor, setMyEditor] = useState('');
    const [idSelected, setIdSelected] = useState('');

    const insertionCallbackCreator = editor => (content, _id = '') => {
        editor.setData('');
        setIdSelected(_id);
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

    const noCandidateDataEvent = () => {
        alert('Pilih setidaknya satu pemenang');
        return <Redirect to="/candidate" />;
    };

    return (
        <ThemeProvider theme={themePage}>
            <div className="new_template_container">
                {!candidateData && noCandidateDataEvent()}
                <TemplateHeaderContainer>
                    <TemplateCreatorHeader>Template Selector</TemplateCreatorHeader>
                    <Button
                        href=""
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if (idSelected) console.log('HMM');
                            else alert('Harus memilih template!');
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
                        <CKEditor
                            config={{
                                height: '100%',
                            }}
                            editor={CKEditorsBuild.ClassicEditor}
                            data={templateData.content}
                            onInit={editor => {
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
        </ThemeProvider>
    );
};

export default withRouter(SelectTemplatePage);
