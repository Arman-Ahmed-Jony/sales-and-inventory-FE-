import client from '../../Clients';

const RESOURCE_NAME = 'bounties';

export default {
  employeeList() {
    return client.get('/v1/employee');
  },
  deleteEmployee(id) {
    return client.delete(`/v1/employee/${id}`);
  },
  create(payload) {
    return client.post(`${RESOURCE_NAME}`, payload);
  },

  list() {
    return client.get(`${RESOURCE_NAME}`);
  },

  update(payload) {
    return client.post(`${RESOURCE_NAME}/${payload.id}`, payload);
  },

  del(id) {
    return client.delete(`${RESOURCE_NAME}/${id}`);
  },

  details(id) {
    return client.get(`${RESOURCE_NAME}/${id}`);
  },
};
