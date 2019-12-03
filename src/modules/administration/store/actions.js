/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import administrationClient from '../api/administration';

export const loadEmployeeList = ({ commit }) => {
  commit('SET_LOADING', true);
  return administrationClient.employeeList()
    .then((response) => {
      const employee = response.data.data;
      console.log(response);
      commit('SET_LOADED_EMPLYEE_LIST', employee);
      commit('SET_LOADING', false);
    })
    .catch((error) => {
      const errorMessage = error.response;
      commit('SET_ERROR', errorMessage);
      // console.log(error)
    });
};
export const deleteEmployee = ({ commit }, id) => administrationClient.deleteEmployee(id);
