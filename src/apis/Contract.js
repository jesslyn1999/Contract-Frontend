import axios from 'axios';

const generateContractDoc = (contractDocData) => new Promise((resolve, reject) => {
    axios({
        method: 'post',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/contract/generate_contract',
        withCredentials: true,
        data: contractDocData,
        responseType: 'blob',
    })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'contract.docx');
            document.body.appendChild(link);
            link.click();
            resolve(response);
        })
        .catch(reject);
});

const getKontrak = (currPage, perPage) => new Promise((resolve, reject) => {
    axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/contract/get_contract${currPage}`,
        withCredentials: true,
        params: {
            perpage: perPage,
        },
    })
        .then(({ data }) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
});

export { generateContractDoc, getKontrak };
