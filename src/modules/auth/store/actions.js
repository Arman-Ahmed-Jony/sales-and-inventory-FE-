import { LocalStorage } from 'quasar';
import usersClient from '../api/auth';

export function userProfile({ commit }, userId) {
  usersClient.find(userId)
    .then((response) => {
      const {
        firstName,
        lastName,
      } = response.data;
      console.log('userProfile');
      commit('PROFILE', { firstName, lastName });
    });
}
export function testAPI() {
  return usersClient.test().then((response) => {
    console.log(response);
    return response;
  });
}

export function signIn({ commit }, params) {
  console.log('action is ', params);
  return usersClient.signIn(params).then((response) => {
    if (response.data.status !== 401) {
      commit('SET_USER_PROFILE', response);
      LocalStorage.set('isAuthenticated', response);
      console.log(response);
    }
    return response;
  });
}
