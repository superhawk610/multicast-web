import { Response, Router } from 'express';
import { managers } from '../../models';

const router = Router();

interface IDatabaseLog {
  created: string[];
}

router.post('/init-db', (_, res: Response) => {
  const log: IDatabaseLog = { created: [] };
  managers.forEach(manager => {
    manager.up();
    log.created.push(manager.tableName);
  });
  res.json(log);
});

export default router;
