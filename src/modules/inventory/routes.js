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
        path: 'inventory',
        component: () => import('./pages/Inventory'),
        name: 'inventory',
        meta: {
          noAuthRequired: false,
        },
      },
    ],
  },
];
