import got = require('got');

import Host from '../../models/host.model';
import Device from '../../models/device.model';
import Channel from '../../models/channel.model';

// Initialize host by sending over all registered devices & channels.
// Returns true if the initialization was successful.
const initializeHost = async (host: Host, channels: Channel[]) => {
  const devices = await Device.findAll({ where: { host } });

  try {
    await got.post(`${host.address}/initialize`, {
      json: true,
      body: {
        devices,
        channels,
      },
    });
  } catch {
    return false;
  }
};

// Initialize all hosts.
// Returns an Array of nicknames of hosts that failed to initialize.
const initializeAllHosts = async () => {
  const hosts = await Host.findAll();
  const channels = await Channel.findAll();
  const failures = await Promise.all(
    hosts.map(async host => {
      const ok = await initializeHost(host, channels);
      return ok ? null : host.nickname;
    }),
  );
  return failures.reduce<string[]>(
    (carry, failure) => (failure ? [...carry, failure] : carry),
    [],
  );
};

export default initializeAllHosts;
