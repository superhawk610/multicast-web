import Hosts from './pages/Hosts';
import Configuration from './pages/Configuration';

import { ComponentClass } from 'react';

interface IRouteConfiguration {
  path: string;
  component: ComponentClass;
  displayInSidebar: boolean;
}
interface IRoutes {
  [routeName: string]: IRouteConfiguration;
}
const routes: IRoutes = {
  Hosts: { path: '/hosts', component: Hosts, displayInSidebar: true },
  Configuration: {
    path: '/configuration',
    component: Configuration,
    displayInSidebar: true,
  },
};

export default routes;
