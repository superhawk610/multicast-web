import Channel from '../models/channel.model';

const channels = [
  new Channel({
    id: 1,
    name: 'Corporate Metrics',
    urls: ['http://localhost:1234/metrics'],
  }),
];

export default channels;
