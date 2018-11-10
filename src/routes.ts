import Hosts from './pages/Hosts';
import Configuration from './pages/Configuration';
import Channels from './pages/Channels';
import ManageChannel from './pages/ManageChannel';

import { ComponentClass, SFC } from 'react';

export interface IRouteConfiguration {
  name: string;
  path: string;
  exact?: boolean;
  component: ComponentClass | SFC;
  displayInSidebar?: boolean;
}
interface IRoutes {
  [routeName: string]: IRouteConfiguration;
}
const routes: IRoutes = {
  Hosts: {
    name: 'Hosts',
    path: '/hosts',
    exact: true,
    component: Hosts,
    displayInSidebar: true,
  },
  Channels: {
    name: 'Channels',
    path: '/channels',
    exact: true,
    component: Channels,
    displayInSidebar: true,
  },
  ManageChannel: {
    name: 'Manage Channels',
    path: '/channels/:id',
    component: ManageChannel,
  },
  Configuration: {
    name: 'Configuration',
    path: '/configuration',
    exact: true,
    component: Configuration,
    displayInSidebar: true,
  },
};

export default routes;
