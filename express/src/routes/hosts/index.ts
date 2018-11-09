import { Request, Response, Router } from 'express';
import Host from '../../models/host.model';

const router = Router();

router
  .route('/')
  .get((_, res: Response) => Host.all().then(hosts => res.json(hosts)))
  .post((req: Request, res: Response) =>
    Host.create(req.body).then(host => res.json(host.toJSON())),
  );

router
  .route('/:id')
  .get((req: Request, res: Response) =>
    Host.findById(req.params.id).then(host => res.json(host.toJSON())),
  )
  .patch((req: Request, res: Response) =>
    Host.findById(req.params.id).then(host =>
      host.update(req.body).then(updatedHost => res.json(updatedHost.toJSON())),
    ),
  );

export default router;
