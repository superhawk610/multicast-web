import { Request, Response, Router } from 'express';
import Channel from '../../models/channel.model';

const router = Router();

router
  .route('/')
  .get((_, res: Response) => Channel.all().then(channels => res.json(channels)))
  .post((req: Request, res: Response) =>
    Channel.create(req.body).then(channel => res.json(channel.toJSON())),
  );

router
  .route('/:id')
  .get((req: Request, res: Response) =>
    Channel.findById(req.params.id).then(channel => res.json(channel.toJSON())),
  )
  .patch((req: Request, res: Response) =>
    Channel.findById(req.params.id).then(channel =>
      channel
        .update(req.body)
        .then(updatedChannel => res.json(updatedChannel.toJSON())),
    ),
  )
  .delete((req: Request, res: Response) =>
    Channel.findById(req.params.id).then(channel =>
      channel.destroy().then(() => res.sendStatus(204)),
    ),
  );

export default router;
