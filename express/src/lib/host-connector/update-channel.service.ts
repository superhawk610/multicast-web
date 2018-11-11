import got = require('got');

import Host from '../../models/host.model';
import Channel from '../../models/channel.model';

// Update the channel on the host.
// Returns true if the host accepted the request.
const updateChannelOnHost = (channel: Channel) => async (host: Host) => {
  try {
    await got.post(`${host.address}/update-channel`, {
      json: true,
      body: channel.toJSON(),
    });
    return true;
  } catch {
    return false;
  }
};

// Update the channel on all hosts.
// Returns an Array of nicknames of hosts that failed to respond.
const updateChannel = async (channel: Channel) => {
  const hosts = await Host.findAll();
  const failures = await Promise.all(
    hosts.map(async host => {
      const ok = await updateChannelOnHost(channel);
      return ok ? null : host.nickname;
    }),
  );
  return failures.reduce<string[]>(
    (carry, failure) => (failure ? [...carry, failure] : carry),
    [],
  );
};

export default updateChannel;
