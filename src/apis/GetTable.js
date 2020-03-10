import axios from 'axios';

const logistik_url = 'api.logistik.itb.ac.id/ta_sppbj?token=8ef83647567cdfgb4K776509242ce0b9';


const getTableName = tableData => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: logistik_url,
            data: tableData,
        })
            .then(res => {

            })
            .catch(err => {
                
            })
    });
}