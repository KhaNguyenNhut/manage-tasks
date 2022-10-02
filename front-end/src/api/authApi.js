import axiosClient from './axiosClient';

const url = '/auth';

const authApi = {
  login: (data) => axiosClient.post(`${url}/login`, data),
  getAccount: (id) => axiosClient.get(`${url}/account/${id}`),
};

export default authApi;
