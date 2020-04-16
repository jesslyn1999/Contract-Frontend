import axios from 'axios';

const addNewJamlak = jamlakData => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/jamlak',
            withCredentials: true,
            data: jamlakData,
        })
            .then(resolve)
            .catch(reject);
    });
};

const getJamlakBySppbj = nomor_sppbj => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/jamlak/get-by-sppbj/' + nomor_sppbj,
            withCredentials: true,
        })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};


export { addNewJamlak, getJamlakBySppbj };
