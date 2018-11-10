import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';

import { SANDBOX } from '../config';

import { default as initFixtures } from '../../fixtures';

const dbFile = path.join(__dirname, SANDBOX ? 'sandbox.sqlite3' : 'db.sqlite3');
const modelPath = path.join(__dirname, '..', '..', 'models');

export let sequelize: Sequelize;

const init = async () => {
  sequelize = new Sequelize({
    database: 'multicast-web',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: dbFile,
    modelPaths: [modelPath],
    // disable string-based operators, and do not set any aliases
    // (i.e. use the built-in Symbol-based operators)
    // taken from [here](https://github.com/sequelize/sequelize/issues/8417)
    operatorsAliases: false,
  });
  await sequelize.sync({ force: SANDBOX });
  if (SANDBOX) initFixtures();
};

export default init;
