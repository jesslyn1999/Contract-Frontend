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

export { addNewSection };
