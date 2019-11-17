// import { LocalStorage } from 'quasar';
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
