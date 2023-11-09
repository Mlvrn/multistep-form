import MainLayout from '@layouts/MainLayout';
import Form from '@pages/Form';

import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Form',
    protected: false,
    component: Form,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
