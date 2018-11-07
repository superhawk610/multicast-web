// tslint:disable-next-line:no-submodule-imports
import 'source-map-support/register';

import cors = require('cors');
import express = require('express');

import { PORT } from './lib/config';
import initDb from './lib/db';

import configRouter from './routes/config';
import hostsRouter from './routes/hosts';

initDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/config', configRouter);
app.use('/hosts', hostsRouter);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`multicast-web-server listening on :${PORT}`);
});
