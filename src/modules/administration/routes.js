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
        path: 'administration',
        component: () => import('./pages/Administration'),
        name: 'administration',
        meta: {
          noAuthRequired: true,
        },
      },
      {
        path: 'users',
        component: () => import('./pages/Users'),
        name: 'users',
        meta: {
          noAuthRequired: true,
        },
      },
    ],
  },
];
