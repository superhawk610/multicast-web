import { listDevices } from './lib/host-connector';

import Device from './models/device.model';

import { POLLING_INTERVAL } from './lib/config';

const pollDevices = async () => {
  const devices = await listDevices();
  await Promise.all(
    devices.map(async ({ identifier, status }) => {
      const device = await Device.findOne({ where: { identifier } });
      return device.update({ status });
    }),
  );
  setInterval(pollDevices, POLLING_INTERVAL);
};

export default pollDevices;
