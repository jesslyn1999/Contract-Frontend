import React from 'react';
import CreateNewTemplate from 'scenes/template-ui/create-new-template/CreateNewTemplate';
import TemplateLanding from 'scenes/template-ui/landing/TemplateLanding';
import { getAllSections } from 'apis/Section';

import './Template.scss';

const Template = () => {
    // pageState 0 means the current state is in the template landing page
    // otherwise, the current state is in the template creator
    const [pageState, setPageState] = React.useState(0);
    const [objData, setObjData] = React.useState();

    const modifyObjData = data => {
        setObjData(data);

        changePageState(false);
    };

    const changePageState = is_create_new => {
        if (is_create_new) {
            setObjData();
        }
        if (pageState === 0) {
            setPageState(1);
        } else {
            setPageState(0);
        }
    };

    if (pageState === 0) {
        return <TemplateLanding setPage={changePageState} dataHandle={modifyObjData} />;
    } else {
        return <CreateNewTemplate data={objData} setPage={changePageState} />;
    }
};

export default Template;
