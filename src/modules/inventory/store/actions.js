/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import inventoryClient from '../api/inventory';

export const loadBountyAccount = ({ commit }) => {
  commit('SET_LOADING', true);
  return inventoryClient.list()
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

export const loadProductCategoryList = ({ commit }) => {
  commit('SET_LOADING', true);
  return inventoryClient.listProductCategory()
    .then((response) => {
      console.log(response);
      commit('SET_PRODUCT_CATEGORY', response.data.data);
      return response;
    })
    .catch((error) => {
      const errorMessage = error.response;
      commit('SET_ERROR', errorMessage);
      // console.log(error)
    });
};

export const deleteProductCategory = ({ commit }, id) => {
  commit('SET_LOADING', true);
  return inventoryClient.deleteProductCategory(id);
};
// export const loadProductCategoryList = ({ commit }) => inventoryClient.listProductCategory().then((response) => {
//     commit('SET_PRODUCT_CATEGORY');
//   });
