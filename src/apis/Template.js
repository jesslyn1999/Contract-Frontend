import axios from 'axios';

const getAllTemplates = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/template/all',
            withCredentials: true,
        })
            .then(({data}) => {
                resolve(data);
            }) 
            .catch(err => {
                reject(err);
            });

    });
};

export { getAllTemplates };