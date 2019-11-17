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
        path: 'sales',
        component: () => import('./pages/Sales'),
        name: 'sales',
        meta: {
          noAuthRequired: true,
        },
      },
    ],
  },
];
