import { css } from 'styled-components';

export const SectionButtonStyle = css`
    background-color: white;
    margin-bottom: 1em;
    border-radius: 0.5em;
    padding: 1em;
    display: flex;
    cursor: pointer;
    & .column_divider {
        display: grid;
        grid-template: 100% / 3fr 2fr;
        width: 100%;
    }
    & .left {
        display: flex;
        flex-direction: column;
    }
    & .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    & .section_title {
        margin: 0;
    }
    & .section_description {
        font-size: 0.9em;
        margin-top: 0.5em;
    }
`;
