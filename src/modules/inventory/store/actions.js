/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import bountiesClient from '../api/bounties';

export const loadBountyAccount = ({ commit }) => {
  commit('SET_LOADING', true);
  return bountiesClient.list()
    .then((response) => {
      const account = response.data.data;
      // console.log('loadbounty accout ', account[0])
      commit('SET_LOADED_ACCOUNT', account[0]);
      // console.log('comment2')
      commit('SET_LOADING', false);
    })
    .catch((error) => {
      const errorMessage = error.response;
      commit('SET_ERROR', errorMessage);
      // console.log(error)
    });
};
