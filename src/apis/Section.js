import axios from 'axios';

const addNewSection = sectionData => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/section/',
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

const getSections = (currPage, perPage, find = null) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/section/' + currPage,
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

const deleteSectionById = id => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/section/' + id,
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


export { addNewSection, getSections, deleteSectionById};
