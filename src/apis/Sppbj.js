import axios from 'axios';

const getAllSPPBJs = (source, keyword = '') => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/get_all_sppbj',
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

const getSPPBJs = (currPage, perPage, find = null) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/get_sppbj/' + currPage,
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

export { getAllSPPBJs, getSPPBJs };