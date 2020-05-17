import axios from 'axios';

const addNewSection = (sectionData) => new Promise((resolve, reject) => {
    axios({
        method: 'post',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/section/',
        withCredentials: true,
        data: sectionData,
    })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
});

const getAllSections = (source, keyword = '') => new Promise((resolve, reject) => {
    axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/section/all',
        withCredentials: true,
        params: {
            keyword,
        },
        cancelToken: source ? source.token : null,
    })
        .then(({ data }) => {
            resolve(data);
        })
        .catch((err) => {
            if (axios.isCancel(err)) alert('cancel request');
            else reject(err);
        });
});

const getSections = (currPage, perPage, find = null) => new Promise((resolve, reject) => {
    axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/section/${currPage}`,
        withCredentials: true,
        params: {
            perpage: perPage,
            find,
        },
    })
        .then(({ data }) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
});

const getSectionById = (id) => new Promise((resolve, reject) => {
    axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/section',
        withCredentials: true,
        params: {
            id,
        },
    })
        .then(({ data }) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
});

const deleteSectionById = (id) => new Promise((resolve, reject) => {
    axios({
        method: 'delete',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/section/${id}`,
        withCredentials: true,
    })
        .then(({ data }) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
});

export {
    addNewSection, getSections, deleteSectionById, getAllSections, getSectionById,
};
