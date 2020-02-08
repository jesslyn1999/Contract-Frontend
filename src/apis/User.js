import axios from 'axios';

const getStaff = () => {
    return new Promise((resolve, reject) => {
        axios
            .create({
                baseURL: process.env.REACT_APP_BACKEND_URL,
                url: '/user/getstafflist',
                withCredentials: true,
            })
            .get()
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export { getStaff };
