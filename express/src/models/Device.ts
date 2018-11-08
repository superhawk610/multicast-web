// this model is managed on the remote Multicast host
// so we just need to know the shape

export interface IDevice {
  host_id: number;
  identifier: string;
  nickname: string;
  status: string;
}
