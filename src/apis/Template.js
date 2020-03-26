import axios from 'axios';

const addNewTemplate = sectionData => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template/',
            withCredentials: true,
            data: sectionData,
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getAllTemplates = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template/all',
            withCredentials: true,
        })
            .then(({data}) => {
                resolve(data);
            }) 
            .catch(err => {
                reject(err);
            });

    });
};

export { addNewTemplate, getAllTemplates };
