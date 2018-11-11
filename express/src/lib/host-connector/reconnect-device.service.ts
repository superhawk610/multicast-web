import got = require('got');

import Device from '../../models/device.model';

// Instruct the host to attempt to reconnect to the device.
// Returns true if the host accepted the request.
const reconnectDevice = async (device: Device) => {
  try {
    await got.post(`${device.host.address}/reconnect-device`, {
      json: true,
      body: { identifier: device.identifier },
    });
    return true;
  } catch {
    return false;
  }
};

export default reconnectDevice;
