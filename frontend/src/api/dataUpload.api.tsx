import BaseAPI, { methodType } from "./baseAPI";
import Globals from "../globals";

export default class DataUploadApi extends BaseAPI {

    constructor() {
        super();
    }

    public static uploadData(jsonData: any) {
        const host = Globals().crystalHost;
        let formData = new FormData();
        formData.append('data', jsonData);

        return fetch(host + "/upload", {
            method: methodType.post,
            body: formData
        }).then(response => response.text())
            .catch(err => {
                console.log(err.message)
            })
    }
}
