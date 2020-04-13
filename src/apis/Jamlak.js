import axios from 'axios';

const addNewJamlak = jamlakData => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/jamlak/',
            withCredentials: true,
            data: jamlakData,
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getAllJamlaks = (source, keyword = '') => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/jamlak/all',
            withCredentials: true,
            params: {
                keyword: keyword,
            },
            cancelToken: source? source.token : null,
        })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                if( axios.isCancel(err)) console.log("cancel request");
                else reject(err);
            });
    });
};

const getJamlaks = (currPage, perPage, find = null) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/jamlak/' + currPage,
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

const getJamlakById = id => {
    console.log('getjamlakbyid is called with id=', id);
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/jamlak',
            withCredentials: true,
            params: {
                id: id,
            },
        })
            .then(({ data }) => {
                console.log(data);
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const deleteJamlakById = id => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/jamlak/' + id,
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

export { addNewJamlak, getJamlaks, deleteJamlakById, getAllJamlaks, getJamlakById };