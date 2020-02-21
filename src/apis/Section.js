import axios from 'axios';
import { SECTIONS_URL, GET_REQUEST } from 'apis/constants';


/*
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
*/

const getSections = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: GET_REQUEST,
            url: SECTIONS_URL,
        })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getSectionsPagination = (numPage, perPage) => {
    return new Promise((resolve, reject) => {
        axios({
            method: GET_REQUEST,
            url: SECTIONS_URL + "/" + numPage,
            params: {
                "perpage": perPage,
            }
        })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export { getSections, getSectionsPagination };
