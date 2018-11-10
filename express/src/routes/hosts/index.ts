import { Router, Request, Response, NextFunction } from 'express';

import Host from '../../models/host.model';

const router = Router();

interface IHostRequest {
  model: Host;
}

type HostRequest = IHostRequest & Request;

router
  .route('/')
  .get((_, res: Response) => Host.findAll().then(hosts => res.json(hosts)))
  .post((req: Request, res: Response) =>
    Host.create(req.body).then(host => res.json(host.toJSON())),
  );

router
  .route('/:id')
  .all((req: HostRequest, res: Response, next: NextFunction) =>
    Host.findById(req.params.id).then(host => {
      if (!host) return res.sendStatus(400);
      req.model = host;
      return next();
    }),
  )
  .get((req: HostRequest, res: Response) => res.json(req.model.toJSON()))
  .patch((req: HostRequest, res: Response) =>
    req.model
      .update(req.body)
      .then(updatedHost => res.json(updatedHost.toJSON())),
  )
  .delete((req: HostRequest, res: Response) =>
    req.model.destroy().then(() => res.sendStatus(204)),
  );

export default router;
