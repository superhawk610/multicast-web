import * as express from 'express';
import * as cors from 'cors';

import hostsRouter from './routes/hosts';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/hosts', hostsRouter);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`multicast-web-server listening on :${PORT}`);
});
