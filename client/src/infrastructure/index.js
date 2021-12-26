import axiosConfig from '../config/axios.config';
import makeApiClient from './apiClient';

const apiClient = makeApiClient({
  config: axiosConfig,
  serializeParams: serializeParamsFromObject,
});

function serializeParamsFromObject(object) {
  return new URLSearchParams(object).toString()
    ? `?${new URLSearchParams(object).toString()}`
    : '';
}

export default apiClient;
