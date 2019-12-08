export default [
  {
    // Always leave this as last one
    path: '/',
    // component: () => import('../dashboard/pages/DashboardIndex')
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: () => import('layouts/ProjectLayout'),
    children: [
      {
        path: 'dashboard',
        component: () => import('./pages/Dashboard'),
        name: 'dashboard',
        meta: {
          noAuthRequired: false,
        },
      },
    ],
  },
];
