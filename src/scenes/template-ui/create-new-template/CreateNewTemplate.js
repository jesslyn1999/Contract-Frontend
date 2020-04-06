import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import CustomBuild from 'ckeditor5-itb-ppl';
// import CustomBuild2 from 'ckeditor5-custom-build2';
import apis from 'apis';
import './CreateNewTemplate.scss';
import 'react-progress-button/react-progress-button.css';
import LoadingButton from 'components/loading-button/LoadingButton';
import SectionInsertor from 'components/section_inserter/SectionInserter';
import {
    TemplateCreatorHeader,
    TemplateNameInput,
    TemplateHeaderContainer,
} from './CreateNewTemplateStyle';
import PropTypes from 'prop-types';

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
    const el = editor.model.document.selection.getFirstPosition();
    // const lastElement = document.getElementsByClassName('ck-editor__editable')[0].lastChild;
    // lastElement.scrollIntoView({ behavior: 'smooth' });
};

const CreateNewSection = props => {
    const { getContents, data } = props;
    const [templateData, setTemplateData] = useState({ title: '', description: '', content: '' });
    const [myEditor, setMyEditor] = useState();

    React.useEffect(() => {
        if (data) {
            setTemplateData(data);
        }
    }, [data]);

    return (
        <div className="new_template_container">
            <TemplateHeaderContainer>
                <TemplateCreatorHeader>Template Creator</TemplateCreatorHeader>
                <TemplateNameInput
                    placeholder="Masukkan judul template"
                    value={templateData.title}
                    onChange={e => {
                        let newTitle = e.target.value;
                        setTemplateData(old => ({ ...old, title: newTitle }));
                    }}
                />
                <LoadingButton onClick={() => apis.template.addNewTemplate(templateData)}>
                    SAVE
                </LoadingButton>
            </TemplateHeaderContainer>

            <div className="main_container">
                <div className="section_insertor_container">
                    <SectionInsertor
                        header="Sections"
                        insertionCallback={insertionCallbackCreator(myEditor)}
                        getContents={getContents}
                    />
                </div>
                <div className="ck_editor_container_template">
                    <CKEditor
                        config={{
                            height: '100%',
                        }}
                        editor={CustomBuild}
                        data={templateData.content}
                        onInit={editor => {
                            setMyEditor(editor);
                            console.log('Editor is ready to use!', editor);
                            editor.editing.view.focus();
                            editor.setData(templateData.content);
                        }}
                        onChange={(_, editor) => {
                            const data = editor.getData();
                            setTemplateData(old => ({ ...old, content: data }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

CreateNewSection.propTypes = {
    getContents: PropTypes.func.isRequired,
};

export default CreateNewSection;
