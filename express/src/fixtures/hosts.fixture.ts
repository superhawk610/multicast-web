import Host from '../models/host.model';

const hosts = [
  new Host({
    id: 1,
    address: '1.1.1.1',
    nickname: 'First Deployment',
    status: 'online',
  }),
];

export default hosts;
