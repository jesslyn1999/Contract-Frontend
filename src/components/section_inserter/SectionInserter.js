import React, { useEffect, useState } from 'react';
import { SectionInserterContainer, Header, SectionButtonContainer } from './SectionInserterStyle';
import { SectionButton } from './SectionInsertButton/SectionInsertButton';
import PropTypes from 'prop-types';
import axios from "axios";

const SectionListCreator = (sections, insertionCallback) =>
    sections.map((section, idx) => (
        <SectionButton key={idx} sectionData={section} insertionCallback={insertionCallback} />
    ));

const SectionInsertor = props => {
    const { header, insertionCallback, getContents } = props;
    const [sectionListContent, setSectionListContent] = useState();

    useEffect(() => {
        let source = axios.CancelToken.source();
        getContents(source).then(res => {
            setSectionListContent(SectionListCreator(res, insertionCallback));
        });
        return () => {
            source.cancel();
        };
    }, [getContents, insertionCallback]);

    return (
        <SectionInserterContainer>
            <Header>{header}</Header>
            <SectionButtonContainer>{sectionListContent}</SectionButtonContainer>
        </SectionInserterContainer>
    );
};

SectionInsertor.propTypes = {
    getContents: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
};


export default SectionInsertor;
