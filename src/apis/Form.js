import axios from 'axios';

const getAllTagsByTemplateId = (idTemplate) => new Promise((resolve, reject) => {
    axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/form/alltag',
        withCredentials: true,
        params: {
            id_template: idTemplate,
        },
    })
        .then(({ data }) => {
            resolve(data);
        })
        .catch(reject);
});

export default { getAllTagsByTemplateId };
