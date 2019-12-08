/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import reportClient from '../api/report';

export const loadSalesList = ({ commit }) => {
  commit('SET_LOADING', true);
  return reportClient.list()
    .then((response) => {
      commit('SET_SALES_LIST', response);
      console.log(response);
    })
    .catch((error) => {
      const errorMessage = error.response;
      commit('SET_ERROR', errorMessage);
      // console.log(error)
    });
};
