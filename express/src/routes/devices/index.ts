import { Router, Request, Response, NextFunction } from 'express';

import Device from '../../models/device.model';

const router = Router();

interface IDeviceRequest {
  model: Device;
}

type DeviceRequest = IDeviceRequest & Request;

router
  .route('/')
  .get((_, res: Response) => Device.all().then(devices => res.json(devices)))
  .post((req: Request, res: Response) =>
    Device.create(req.body).then(device => res.json(device.toJSON())),
  );

router
  .route('/:id')
  .all((req: DeviceRequest, res: Response, next: NextFunction) =>
    Device.findById(req.params.id).then(device => {
      if (!device) return res.sendStatus(400);
      req.model = device;
      return next();
    }),
  )
  .get((req: DeviceRequest, res: Response) => res.json(req.model.toJSON()))
  .patch((req: DeviceRequest, res: Response) =>
    req.model
      .update(req.body)
      .then(updatedDevice => res.json(updatedDevice.toJSON())),
  )
  .delete((req: DeviceRequest, res: Response) =>
    req.model.destroy().then(() => res.sendStatus(204)),
  );

export default router;
