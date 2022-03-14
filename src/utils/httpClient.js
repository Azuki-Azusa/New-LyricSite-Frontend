import { Dialog } from "quasar";

const axios = require("axios").default;
const host = process.env.VUE_APP_BACKEND_HOST;

export async function req(method, path, data = null) {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: host + "/api" + path,
            data: data,
        }).then(function (response) {
            var data = response.data
            if (data.state) {
                resolve(data.data)
            }
            else {
                Dialog.create({
                    title: 'Error',
                    message: data.errMsg
                })
                reject()
            }
        }).catch(function (e) {
            console.log(e)
            reject()
        });
    })
}