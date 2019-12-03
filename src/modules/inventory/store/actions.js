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
export const deleteProduct = ({ commit }, id) => {
  commit('SET_LOADING', true);
  return inventoryClient.deleteProduct(id);
};

export const addProductCategory = ({ commit }, payload) => {
  commit('SET_LOADING', true);
  return inventoryClient.addProductCategory(payload)
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

export const loadProductList = ({ commit }) => {
  commit('SET_LOADING', true);
  return inventoryClient.productList()
    .then((response) => {
      commit('SET_PRODUCT', response.data.data);

      console.log(response);
      return response;
    })
    .catch((error) => {
      const errorMessage = error.response;
      commit('SET_ERROR', errorMessage);
      // console.log(error)
    });
};
export const createProduct = ({ commit }, payload) => {
  commit('SET_LOADING', true);
  return inventoryClient.createProduct(payload)
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
