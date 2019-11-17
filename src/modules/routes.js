import { routes as auth } from './auth';
import { routes as dashboard } from './dashboard';
import { routes as indevtory } from './inventory';
import { routes as report } from './report';
import { routes as sales } from './sales';
import { routes as administration } from './administration';

export default [
  ...auth,
  ...dashboard,
  ...indevtory,
  ...report,
  ...sales,
  ...administration,
  {
    // Always leave this as last one
    path: '*',
    component: () => import('../pages/Error404'),
  },
];
