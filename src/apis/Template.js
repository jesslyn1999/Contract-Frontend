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

const getAllTemplates = source => {
    // source = axios.CancelToken.source();
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template/all',
            withCredentials: true,
            cancelToken: source.token,
        })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                if (axios.isCancel(err)) console.log('cancel request');
                else reject(err);
            });
    });
};

const getTemplates = (currPage, perPage = 6, find = null) => {
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
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getTemplateById = id => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template',
            withCredentials: true,
            params: {
                id: id,
            },
        })
            .then(({ data }) => {
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

const getTemplateFormField = id => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template',
            withCredentials: true,
            params: {
                id: id,
            },
        })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export { addNewTemplate, getAllTemplates, getTemplates, getTemplateById, deleteTemplateById, getTemplateFormField };
