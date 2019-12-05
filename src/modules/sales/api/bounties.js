import client from '../../Clients';

// const RESOURCE_NAME = 'bounties';

export default {

  createSale(payload) {
    return client.post('/v1/sales', payload);
  },
};
