import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import CustomBuild from 'ckeditor5-itb-ppl';
import Popup from 'reactjs-popup';
import apis from 'apis';
import './CreateNewSection.scss';
import 'react-progress-button/react-progress-button.css';
import ProgressButton from 'react-progress-button';
import PropTypes from 'prop-types';

const saveFunction = (sectionData, close) =>
    new Promise((resolve, reject) => {
        let time = new Date();
        apis.section
            .addNewSection(sectionData)
            .then(res => {
                let processingTime = new Date() - time;
                setTimeout(() => {
                    resolve();
                    setTimeout(close, 500);
                }, Math.max(0, 1000 - processingTime));
            })
            .catch(err => {
                let processingTime = new Date() - time;
                setTimeout(reject, Math.max(0, 1000 - processingTime));
            });
    });

const CreateNewSection = props => {
    const { triggerContent } = props;
    const [sectionData, setSectionData] = useState({ title: '', description: '', content: '' });
    const [savingState, setSavingState] = useState();

    return (
        <Popup
            modal
            trigger={triggerContent}
            position="right center"
            style={{ borderRadius: '10px' }}
        >
            {close => (
                <div className="new_section_container">
                    <div className="modal_title">Buat Section Baru</div>
                    <div className="input_judul_container">
                        <div className="input_judul_label">Judul:</div>
                        <input
                            className="judul_input"
                            placeholder="Masukkan judul section"
                            value={sectionData.title}
                            onChange={e => {
                                let newTitle = e.target.value;
                                setSectionData(old => ({ ...old, title: newTitle }));
                            }}
                        />
                    </div>
                    <div className="input_judul_container">
                        <div className="input_judul_label">Deskripsi:</div>
                        <input
                            className="judul_input"
                            placeholder="Masukkan deskripsi section"
                            value={sectionData.description}
                            onChange={e => {
                                let newDesc = e.target.value;
                                setSectionData(old => ({ ...old, description: newDesc }));
                            }}
                        />
                    </div>
                    <div className="ck_editor_container">
                        <CKEditor
                            config={{ height: '100%' }}
                            editor={CustomBuild}
                            data={sectionData.content}
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                // console.log({ event, editor, data });
                                console.log(sectionData);
                                setSectionData(old => ({ ...old, content: data }));
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>

                    <div className="prompt_button_container">
                        <ProgressButton
                            onClick={() => saveFunction(sectionData, close)}
                            className="prompt_button"
                        >
                            Submit
                        </ProgressButton>
                        <ProgressButton
                            onClick={() =>
                                new Promise((resolve, reject) => {
                                    resolve();
                                    close();
                                })
                            }
                            className="prompt_button"
                        >
                            Cancel
                        </ProgressButton>
                    </div>
                </div>
            )}
        </Popup>
    );
};


CreateNewSection.propTypes = {
    triggerContent: PropTypes.func.isRequired,
};

export default CreateNewSection;
