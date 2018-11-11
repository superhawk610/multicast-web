import got = require('got');

import Device from '../../models/device.model';

// Update the device listing on the host.
// Returns true if the request was successful.
const updateDevice = async (device: Device) => {
  try {
    await got.patch(`${device.host.address}/devices`, {
      json: true,
      body: { device },
    });
    return true;
  } catch {
    return false;
  }
};

export default updateDevice;
