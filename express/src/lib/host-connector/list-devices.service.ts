import got = require('got');

import Host from '../../models/host.model';

import { Response as GotResponse } from 'got';
import { IErrorResponse } from './types';

interface IHostConnectorDevice {
  identifier: string;
  status: string;
}

type IResponse = IHostConnectorDevice[];

type HostResponse = GotResponse<IResponse>;

type Response = IResponse | IErrorResponse;

// List all devices visible to the host.
// Returns an Array of devices.
const listDevices = async (host: Host): Promise<Response> => {
  try {
    const { body: devices }: HostResponse = await got(
      `${host.address}/devices`,
      { json: true },
    );
    return devices;
  } catch (e) {
    return { error: e.message };
  }
};

const flattenResponseArray = (arr: Response[]) => {
  return arr.reduce<IHostConnectorDevice[]>((carry, res) => {
    return Array.isArray(res) ? [...carry, ...res] : carry;
  }, []);
};

// List all devices from all hosts.
// Returns an Array of devices.
const listAllDevices = async () => {
  const hosts = await Host.findAll();
  const devices = await Promise.all(hosts.map(listDevices));
  return flattenResponseArray(devices);
};

export default listAllDevices;
