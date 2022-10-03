import axiosClient from './axiosClient';

const url = '/role';

const roleApi = {
  getRoles: () => axiosClient.get(`${url}`),
};

export default roleApi;
