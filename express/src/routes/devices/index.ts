import { Response, Router } from 'express';
import { IDevice } from '../../models/Device';

const router = Router();

const devices: IDevice[] = [
  {
    host_id: 1,
    identifier: 'ABC-123',
    nickname: 'Living Room',
    status: 'online',
  },
  { host_id: 1, identifier: 'ABC-456', nickname: 'Bedroom', status: 'offline' },
  {
    host_id: 1,
    identifier: 'ABC-789',
    nickname: 'Kitchen',
    status: 'searching',
  },
  {
    host_id: 2,
    identifier: 'DEF-123',
    nickname: 'Living Room',
    status: 'online',
  },
  {
    host_id: 3,
    identifier: 'GHI-123',
    nickname: 'Living Room',
    status: 'offline',
  },
];

router.get('/', (_, res: Response) => res.json(devices));

export default router;
