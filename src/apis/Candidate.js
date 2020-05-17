import axios from 'axios';

const getAllCandidates = (keyword = '') => new Promise((resolve, reject) => {
    axios({
        method: 'get',
        baseURL: 'http://api.logistik.itb.ac.id',
        url: '/ta_sppemenang/2019?token=8ef83647567cdfgb4K776509242ce0b9',
        withCredentials: true,
        params: {
            keyword,
        },
    })
        .then(({ data }) => {
            resolve(data);
        })
        .catch(reject);
});

const getAllKeys = (baseURL, url, keyword = '') => new Promise((resolve, reject) => {
    axios({
        method: 'get',
        baseURL,
        url,
        withCredentials: true,
        params: {
            keyword,
        },
    })
        .then(({ data }) => {
            // const keys = [];
            // for (const k in data.data[0]) {
            //     keys.push(k);
            // }
            // resolve(keys);
            const firstData = data.data[0];
            resolve(Object.keys(firstData));
        })
        .catch(reject);
});

export { getAllCandidates, getAllKeys };
