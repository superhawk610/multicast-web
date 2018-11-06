import { Router, Response } from 'express';

const router = Router();

const hosts = [{ address: '1.1.1.1' }, { address: '2.2.2.2' }];

router.get('/', (_, res: Response) => {
  res.json(hosts);
});

export default router;
