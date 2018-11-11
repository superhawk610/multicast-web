import Host from '../models/host.model';

const hosts = [
  new Host({
    id: 1,
    address: '1.1.1.1',
    nickname: 'Home Deployment',
    status: 'online',
  }),
  new Host({
    id: 2,
    address: '2.2.2.2',
    nickname: 'Work Deployment 1',
    status: 'online',
  }),
  new Host({
    id: 3,
    address: '3.3.3.3',
    nickname: 'Work Deployment 2',
    status: 'offline',
  }),
];

export default hosts;
