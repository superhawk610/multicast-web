import { Router, Request, Response, NextFunction } from 'express';

import Channel from '../../models/channel.model';

const router = Router();

interface IChannelRequest {
  model: Channel;
}

type ChannelRequest = IChannelRequest & Request;

router
  .route('/')
  .get((_, res: Response) =>
    Channel.findAll().then(channels => res.json(channels)),
  )
  .post((req: Request, res: Response) =>
    Channel.create(req.body).then(channel => res.json(channel.toJSON())),
  );

router
  .route('/:id')
  .all((req: ChannelRequest, res: Response, next: NextFunction) =>
    Channel.findById(req.params.id).then(channel => {
      if (!channel) return res.sendStatus(400);
      req.model = channel;
      return next();
    }),
  )
  .get((req: ChannelRequest, res: Response) => res.json(req.model.toJSON()))
  .patch((req: ChannelRequest, res: Response) =>
    req.model
      .update(req.body)
      .then(updatedChannel => res.json(updatedChannel.toJSON())),
  )
  .delete((req: ChannelRequest, res: Response) =>
    req.model.destroy().then(() => res.sendStatus(204)),
  );

export default router;
