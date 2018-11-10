import { Request, Response, Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import got = require('got');

import Probe from '../../models/probe.model';

const router = Router();

router.get(
  '/check-host-validity',
  asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.query;

    const response = await got.head(address);
    const valid =
      typeof response.headers['X-Multicast-Version'] !== 'undefined';

    res.json({ valid });
  }),
);

router
  .route('/probe-url')
  .post(
    asyncHandler(async (req: Request, res: Response) => {
      const { address, refresh: refreshParam } = req.query;
      const refresh = !!refreshParam;

      const cachedProbe = await Probe.findOne({
        where: {
          address,
        },
      });

      if (cachedProbe) {
        if (refresh) {
          await cachedProbe.destroy();
        } else {
          return res.json({ cached: true, ...cachedProbe.toJSON() });
        }
      }

      const response = await got(address, { method: 'OPTIONS' });
      const probe = new Probe({
        address,
        responseCode: response.statusCode,
        headers: response.headers,
      });
      await probe.save();

      return res.json({ cached: false, ...probe.toJSON() });
    }),
  )
  .delete(
    asyncHandler(async (req: Request, res: Response) => {
      const { address } = req.query;

      const cachedProbe = await Probe.findOne({ where: { address } });
      if (!cachedProbe) {
        return res.sendStatus(400);
      }

      await cachedProbe.destroy();

      return res.sendStatus(204);
    }),
  );

export default router;
