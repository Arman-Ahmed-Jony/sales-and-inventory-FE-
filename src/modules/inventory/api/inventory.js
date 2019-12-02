import client from '../../Clients';

const RESOURCE_NAME = 'bounties';

export default {
  listProductCategory() {
    return client.get('/v1/productcat');
  },
  deleteProductCategory(id) {
    return client.delete(`/v1/productcat/${id}`);
  },
  addProductCategory(payload) {
    return client.post('/v1/productcat', payload);
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
