import { Request, Response, Router } from 'express';
import { HostManager } from '../../models/Host';

const router = Router();

router
  .route('/')
  .get((_, res: Response) =>
    res.json(
      HostManager.all().map(m => ({ ...m.serialize(), status: 'online' })),
    ),
  )
  .post((req: Request, res: Response) => {
    const instance = req.body;
    const model = HostManager.create(instance);
    res.json({ ...model.serialize(), status: 'online' });
  });

router
  .route('/:id')
  .get((req: Request, res: Response) =>
    res.json({
      ...HostManager.findOne(req.params.id).serialize(),
      status: 'online',
    }),
  )
  .patch((req: Request, res: Response) => {
    const model = HostManager.findOne(req.params.id);
    model.update(req.body);
    model.save();
    res.json({ ...model.serialize(), status: 'online' });
  });

export default router;
