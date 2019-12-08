import client from '../../Clients';
// const RESOURCE = 'users'
export default {
  test() {
    return client.get('/v1/productcat');
  },
  all() {
    return client.get('/users');
  },
  find(userId) {
    return client.get(`/users/${userId}`);
  },
  update(userId, data) {
    return client.put(`/users/${userId}`, data);
  },
  signIn(params) {
    return client.post('/v1/user/login', params);
  },
  getUserInfo() {
    return client.get('whoami');
  },
  logout() {
    return client.get('logout');
  },
};
