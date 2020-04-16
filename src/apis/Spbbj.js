import axios from 'axios';

const generateSpbbjDoc = spbbjDocData => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/document/generate_sppbj',
            withCredentials: true,
            data: spbbjDocData,
            responseType: 'blob',
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'document.pdf');
                document.body.appendChild(link);
                link.click();
                resolve(response);
            })
            .catch(reject);
    });
};

const getSpbbj = (currPage, perPage) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: '/document/get_sppbj/' + currPage,
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


export { generateSpbbjDoc, getSpbbj};