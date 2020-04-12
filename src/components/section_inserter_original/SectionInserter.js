import React, { useEffect, useState } from 'react';
import { getAllSections } from 'apis/Section';
import { SectionInserterContainer, Header, SectionButtonContainer } from './SectionInserterStyle';
import { SectionButton } from './SectionInsertButton/SectionInsertButton';

const SectionListCreator = (sections, insertionCallback) =>
    sections.map((section, idx) => (
        <SectionButton key={idx} sectionData={section} insertionCallback={insertionCallback} />
    ));

const SectionInsertor = props => {
    const [sectionListContent, setSectionListContent] = useState();

    useEffect(() => {
        getAllSections().then(res => {
            setSectionListContent(SectionListCreator(res, props.insertionCallback));
        });
    }, [props.insertionCallback]);

    return (
        <SectionInserterContainer>
            <Header>Sections</Header>
            <SectionButtonContainer>{sectionListContent}</SectionButtonContainer>
        </SectionInserterContainer>
    );
};

export default SectionInsertor;
