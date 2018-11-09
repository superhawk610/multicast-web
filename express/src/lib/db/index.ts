import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';

const dbFile = path.join(__dirname, 'db.sqlite3');
const modelPath = path.join(__dirname, '..', '..', 'models');

export let sequelize: Sequelize;

const init = () => {
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
  sequelize.sync();
};

export default init;
