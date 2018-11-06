import Database = require('better-sqlite3');
import * as path from 'path';

const dbFile = path.join(__dirname, 'db.sqlite3');

export let db: Database;

const init = () => {
  db = new Database(dbFile);
};

export default init;
