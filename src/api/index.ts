import {useSelector} from 'react-redux';
import axios from 'axios';

import {TRootState} from '../redux/store';
import {} from '../common';

const baseUrl = 'https://www.test.com/';

const Api = (
  type: string,
  serviceUrl: string,
  params: object | null,
  data: object | null,
) => {
  const {GlobalReducer, UserReducer} = useSelector(
    (state: TRootState) => state,
  );
  const {isInternetReachable} = GlobalReducer ?? false;
  const {token} = UserReducer ?? null;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  const url = baseUrl + serviceUrl;
  if (!isInternetReachable) {
    __DEV__ && console.log('Internet Not Reachable: ', type, url, params);
    return;
  }
  switch (type) {
    case 'get':
      return axios
        .get(url, {params: params})
        .then(response => {
          __DEV__ && console.log('Get Api Success: ', url, params, response);
          return response;
        })
        .catch(error => {
          __DEV__ && console.log('Get Api Error : ', url, params, error);
          return error;
        });

    case 'post':
      return axios
        .post(url, params, {params: data, maxContentLength: Infinity})
        .then(response => {
          __DEV__ && console.log('Post Api Success: ', url, params, response);
          return response;
        })
        .catch(error => {
          __DEV__ && console.log('Post Api Error : ', url, params, error);
          return error;
        });
    default:
      break;
  }
};

export default Api;
