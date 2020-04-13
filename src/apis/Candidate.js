import axios from 'axios';

const getAllCandidates = (keyword = '') => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: 'http://api.logistik.itb.ac.id',
            url: '/ta_sppemenang/2019?token=8ef83647567cdfgb4K776509242ce0b9',
            withCredentials: true,
            params: {
                keyword: keyword,
            },
        })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(reject);
    });
};

const getAllKeys = (baseURL, url, keyword = '') => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: baseURL,
            url: url,
            withCredentials: true,
            params: {
                keyword: keyword,
            },
        })
            .then(({ data }) => {
                var keys = []
                for (var k in data.data[0]) {
                    keys.push(k);
                }
                resolve(keys);
            })
            .catch(reject);
    });
};

export { getAllCandidates, getAllKeys };