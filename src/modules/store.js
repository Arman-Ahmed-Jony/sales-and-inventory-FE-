import { store as auth } from './auth';
import { store as inventory } from './inventory';
import { store as dashboard } from './dashboard';
import { store as report } from './report';
import { store as sales } from './sales';
import { store as administration } from './administration';

export default {
  namespaced: true,
  auth,
  inventory,
  dashboard,
  report,
  sales,
  administration,
};
