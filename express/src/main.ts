import express = require('express');
import cors = require('cors');

import initDb from './lib/db';
import { PORT } from './lib/config';

import hostsRouter from './routes/hosts';

initDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/hosts', hostsRouter);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`multicast-web-server listening on :${PORT}`);
});
