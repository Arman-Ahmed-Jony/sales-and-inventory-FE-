
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/company',
    component: () => import('layouts/ProjectLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'sales', component: () => import('pages/Sales.vue') },
      { path: 'inventory', component: () => import('pages/Inventory.vue') },
      { path: 'report', component: () => import('pages/Report.vue') },
      { path: 'administration', component: () => import('pages/Administration.vue') },
    ],

  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
