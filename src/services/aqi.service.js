import axios from "axios";

export class AqiService {
  static async getData() {
    const url = 'https://data.epa.gov.tw/api/v2/aqx_p_02';
    const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';
    try {
      return await axios.get(`${url}?api_key=${key}`)
    } catch (e) {
      return
    }
  }
}
