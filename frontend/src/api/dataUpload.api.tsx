import BaseAPI, { methodType } from './baseAPI';
import Globals from '../globals';

export default class DataUploadApi extends BaseAPI {
  constructor() {
    super();
  }

  public static async uploadData(jsonData: any) {
    const host = Globals().crystalHost;
    let formData = new FormData();
    formData.append('data', jsonData.json);
    console.log(jsonData.json);
    try {
      const response = await fetch(host + '/crystal/upload', {
        method: methodType.post,
        body: formData,
      });
      return await response.text();
    } catch (err) {
      console.log(err.message);
    }
  }
}
