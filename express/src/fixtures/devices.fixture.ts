import Device from '../models/device.model';

const devices = [
  new Device({
    id: 1,
    hostId: 1,
    channelId: 1,
    identifier: 'ABC-123',
    status: 'online',
    nickname: 'Living Room',
  }),
];

export default devices;
