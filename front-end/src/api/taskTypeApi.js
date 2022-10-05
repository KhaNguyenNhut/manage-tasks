import axiosClient from './axiosClient';

const url = '/taskType';

const roleApi = {
  getTaskTypes: () => axiosClient.get(`${url}`),
};

export default roleApi;
