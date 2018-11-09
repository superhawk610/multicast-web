// tslint:disable-next-line:no-submodule-imports
import 'source-map-support/register';

import cors = require('cors');
import express = require('express');

import { PORT, THROTTLE } from './lib/config';
import initDb from './lib/db';

import utilsRouter from './routes/utils';
import hostsRouter from './routes/hosts';
import devicesRouter from './routes/devices';
import channelsRouter from './routes/channels';

import { NextFunction } from 'express';

initDb();

const app = express();

app.use(cors());
app.use(express.json());

if (THROTTLE) {
  app.use((_, __, next: NextFunction) => {
    setTimeout(next, THROTTLE);
  });
}

app.use('/utils', utilsRouter);
app.use('/hosts', hostsRouter);
app.use('/devices', devicesRouter);
app.use('/channels', channelsRouter);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`multicast-web-server listening on :${PORT}`);
});
