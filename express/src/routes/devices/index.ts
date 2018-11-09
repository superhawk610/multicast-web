import { Request, Response, Router } from 'express';
import Device from '../../models/device.model';

const router = Router();

router
  .route('/')
  .get((_, res: Response) => Device.all().then(devices => res.json(devices)))
  .post((req: Request, res: Response) =>
    Device.create(req.body).then(device => res.json(device.toJSON())),
  );

router
  .route('/:id')
  .get((req: Request, res: Response) =>
    Device.findById(req.params.id).then(device => res.json(device.toJSON())),
  )
  .patch((req: Request, res: Response) =>
    Device.findById(req.params.id).then(device =>
      device
        .update(req.body)
        .then(updatedDevice => res.json(updatedDevice.toJSON())),
    ),
  );

export default router;
