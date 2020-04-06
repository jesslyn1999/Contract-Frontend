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

export { getAllCandidates };