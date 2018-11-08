import Hosts from './pages/Hosts';
import Configuration from './pages/Configuration';

import { ComponentClass, SFC } from 'react';

interface IRouteConfiguration {
  path: string;
  component: ComponentClass | SFC;
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
