import BaseAPI, { methodType } from './baseAPI';
import Globals from '../globals';

export default class DataRetrieveAPI extends BaseAPI {
  constructor() {
    super();
  }

  public static async dataRetrieve(attribute: String) {
    const host = Globals().crystalHost;
    let data = [];
    try {
      const response = await fetch(host + '/crystal/' + attribute, {
        method: methodType.get,
      });
      data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
    return data;
  }
}
