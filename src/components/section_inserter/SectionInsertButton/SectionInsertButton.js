import React from 'react';
import styled from 'styled-components';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SectionButtonStyle } from './SectionInsertButtonStyle';

const PlainSectionButton = ({ sectionData = {}, className, insertionCallback }) => {
    const { _id, title, description, content } = sectionData;

    return (
        <div
            className={className}
            onClick={() => {
                if (_id) insertionCallback(content, sectionData);
                else insertionCallback(content);
            }}
        >
            <div className="column_divider">
                <div className="left">
                    <h2 className="section_title">{title}</h2>
                    <p className="section_description">{description}</p>
                </div>
                <div className="right">
                    <ChevronRightIcon style={{ fontSize: 60 }} />
                </div>
            </div>
        </div>
    );
};

export const SectionButton = styled(PlainSectionButton)`
    ${SectionButtonStyle}
`;
