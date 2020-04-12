import styled from 'styled-components';
import ProgressButton from 'react-progress-button';

export const TemplateCreatorHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 25px;
    font-weight: 600;
`;

export const TemplateNameInput = styled.input`
    border: none;
    border-bottom: 1px solid #8c8c8c;
    font-size: 25px;
    margin: 0 0 0 2em;
`;

export const TemplateHeaderContainer = styled.div`
    margin: 1em 0 1em 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: flex-end;
    & > button:nth-last-child(2) {
        margin-left: auto;
        margin-right: 1em;
    }
`;

export const TemplateCreatorSaveButton = styled(ProgressButton)`
    width: 5em;
    background-color: #003366;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    & .pb-button {
        border: none;
    }
`;
