import axios from 'axios';


const getKontrak = (currPage, perPage) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/contract/get_contract' + currPage,
            withCredentials: true,
            params: {
                perpage: perPage,
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


export { getKontrak};