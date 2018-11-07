import { Router, Response } from 'express';
import { managers } from '../../models';

const router = Router();

type DatabaseLog = { created: Array<string> };

router.get('/init-db', (_, res: Response) => {
  const log: DatabaseLog = { created: [] };
  managers.forEach(manager => {
    manager.up();
    log.created.push(manager.tableName);
  });
  res.json(log);
});

export default router;
