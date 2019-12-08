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
        path: 'report',
        component: () => import('./pages/Report'),
        name: 'report',
        meta: {
          noAuthRequired: false,
        },
      },
    ],
  },
];
