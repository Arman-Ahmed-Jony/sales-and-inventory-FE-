/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import salesClient from '../api/bounties';

export const createSale = ({ commit }, payload) => {
  commit('SET_LOADING', true);
  return salesClient.createSale(payload)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      const errorMessage = error.response;
      commit('SET_ERROR', errorMessage);
      // console.log(error)
    });
};
