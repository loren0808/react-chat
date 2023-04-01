import axios from 'axios'

export default function ajax(url, data = {}, method = 'get') {
    if(method === 'get'){
        return axios({
            url,
            method,
            params:data
        })
    }else{
        return axios({
            url,
            method,
            data
        })
    }
}