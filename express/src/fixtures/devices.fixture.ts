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
  new Device({
    id: 2,
    hostId: 1,
    channelId: 1,
    identifier: 'ABC-456',
    rotation: 0,
    status: 'online',
    nickname: 'Bedroom',
  }),
  new Device({
    id: 3,
    hostId: 1,
    channelId: 2,
    identifier: 'ABC-789',
    rotation: 0,
    status: 'offline',
    nickname: 'Kitchen',
  }),
  new Device({
    id: 4,
    hostId: 2,
    channelId: 1,
    identifier: 'DEF-123',
    rotation: 0,
    status: 'online',
    nickname: 'Board Room',
  }),
  new Device({
    id: 5,
    hostId: 2,
    channelId: 2,
    identifier: 'DEF-456',
    rotation: 0,
    status: 'offline',
    nickname: 'Hallway',
  }),
  new Device({
    id: 6,
    hostId: 3,
    channelId: 1,
    identifier: 'GHI-123',
    rotation: 0,
    status: 'offline',
    nickname: 'Main Hallway',
  }),
  new Device({
    id: 7,
    hostId: 3,
    channelId: 1,
    identifier: 'GHI-456',
    rotation: 0,
    status: 'offline',
    nickname: 'Southwest Hallway',
  }),
];

export default devices;
