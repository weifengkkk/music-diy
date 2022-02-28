import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout = 3000


export default {
    get: function (path = '',data = {} ){
        return new Promise(function (resolve, reject){
            axios.get(path,{
                params:data
            }).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    post: function (path = '',data = {} ){
        return new Promise(function (resolve, reject){
            axios.post(path,data ).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    }
}