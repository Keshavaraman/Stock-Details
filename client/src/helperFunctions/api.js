import axios from 'axios';
import { spinnerService } from './spinner';
export default async function api(url, method = 'GET', data = null, headers = {}) {
    try {
      spinnerService.showSpinner();
      const response = await axios({
        url,
        method,
        data,
        headers,
      });
      spinnerService.hideSpinner();
      return response;
    } catch (error) {
      spinnerService.hideSpinner();
      throw error;
    }
  }