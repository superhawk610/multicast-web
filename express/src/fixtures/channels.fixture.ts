import Channel from '../models/channel.model';

const channels = [
  new Channel({
    id: 1,
    name: 'Corporate Metrics',
    layout: 'single',
    duration: 0,
    urls: ['http://localhost:1234/metrics'],
  }),
  new Channel({
    id: 2,
    name: 'Employee Activity',
    layout: 'single',
    duration: 0,
    urls: ['http://localhost:1234/activity'],
  }),
];

export default channels;
