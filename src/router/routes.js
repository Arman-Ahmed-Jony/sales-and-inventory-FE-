
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/ProjectLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/Index.vue') },
    ],

  },
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
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
