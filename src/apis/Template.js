import axios from 'axios';

const getAllTemplates = (currPage = 1, perPage = 6, find = null) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template/' + currPage,
            withCredentials: true,
            params: {
                perpage: perPage,
                find: find,
            },
        })
            .then(({data}) => {
                resolve(data);
            }) 
            .catch(err => {
                reject(err);
            });

    });
};

const deleteTemplateById = id => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template/' + id,
            withCredentials: true,
        })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export { getAllTemplates, deleteTemplateById };
