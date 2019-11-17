/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { Dialog, Notify, LocalStorage } from 'quasar';
import { API_URL } from '../consts';
import ppStore from '../store/index';
import ppRouter from '../router/index';

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
  const options = {
    baseURL: API_URL,
  };

  // // console.log(test.getters.isAuthenticated)

  if (LocalStorage.getItem('isAuthenticated')) {
    options.headers = {
      'Access-Token': LocalStorage.getItem('isAuthenticated'),
      // 'company-id': ppStore.getters.user.defaultCompany,
      'Content-Type': 'application/json',
    };
  }

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    requestError => Promise.reject(requestError),
  );

  // Add a response interceptor
  client.interceptors.response.use(
    handleSuccess, handleError,
    /* (error) => {
      if (error.response.status >= 500) {
        // console.log(error)
      }
      if (error.response.status === 401) {
        // console.log('logout user')
        ppStore.dispatch('logoutUser')
        this.router.push('logout')
      }
      return Promise.reject(error)
    } */
  );

  function handleSuccess(response) {
    // console.log(response.data)
    // if (response.data.id) {
    //   Notify.create({
    //     message: 'Success!',
    //     position: 'bottom',
    //     icon: 'done',
    //     color: 'purple'
    //     // actions: [
    //     //   {
    //     //     label: 'Dismiss',
    //     //     handler: () => {
    //     //       // console.log('Dismissed')
    //     //     }
    //     //   }
    //     // ]
    //   })
    // }
    return ({ data: response.data });
  }

  function handleError(error) {
    if (error.message === 'Network Error') {
      // The user doesn't have internet
      Notify.create({
        message: 'No Internet',
        position: 'bottom',
        icon: 'signal_wifi_off',
        actions: [
          {
            label: 'Dismiss',
            handler: () => {
              // console.log('Dismissed')
            },
          },
        ],
      });
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 400:
        Notify.create({
          message: error.response.data.errorMessage,
          // position: 'top',
          icon: 'report_problem',
          actions: [
            {
              label: 'Dismiss',
              handler: () => {
                // console.log('dismissed')
              },
            },
          ],
        });
        break;
      case 401:
        // Go to login
        // console.log('please log me out')
        let title;
        const errorCode = error.response.data.localErrorCode;
        switch (errorCode) {
          case '400001':
            title = 'Wrong Credentials';
            Dialog.create({
              title,
              message: error.response.data.errorMessage,
              ok: 'Login',
              cancel: false,
              preventClose: true,
            }).onOk((test) => {
              ppStore().commit('SET_LOADING', false);
              console.log('test');
              return 'test';
            });
            break;
          case '100003':
            title = 'Session Expired';
            Dialog.create({
              title,
              message: error.response.data.errorMessage,
              ok: 'Login',
              cancel: false,
              preventClose: true,
            }).onOk((test) => {
              ppStore().commit('SET_LOADING', false);
              LocalStorage.remove('isAuthenticated');
              LocalStorage.remove('user');
              ppRouter().go('/auth');
              // .then(res => this.$router.go('/auth'))
            });
            break;
        }
        break;
      case 404:
        // Show 404 page
        break;
      case 500:
        // Serveur Error redirect to 500
        break;
      default:
        // Unknow Error
        break;
    }
    /* Notify.create({
      message: error.response.data.errorMessage,
      position: 'top',
      icon: 'report_problem',
      actions: [
        {
          label: 'Dismiss',
          handler: () => {
            // // console.log('dismissed')
          }
        }
      ]
    }) */
    return Promise.reject(error);
  }
  return client;
};

class ApiClient {
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client.get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client.delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client.head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client.options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client.post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client.put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client.patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient().get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient().delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient().head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  options(url, conf = {}) {
    return getClient().options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    return getClient().post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient().put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient().patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
