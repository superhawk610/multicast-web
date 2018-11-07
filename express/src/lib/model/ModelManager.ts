import { db } from '../db';

import Model from './Model';
import {
  getCreateTableQuery,
  getDropTableQuery,
  getSelectQuery,
} from './query-format';
import {
  IDatabaseRow,
  IModel,
  IModelFieldMapping,
  IModelInstance,
  PrimaryKeyValue,
} from './types';

type ModelConstructor = new (
  instance?: IModelInstance,
  persisted?: boolean,
) => IModel;
class ModelManager {
  public tableName: string;
  public primaryKey: string;
  public fields: IModelFieldMapping;
  private ModelClass: ModelConstructor;

  public constructor(c: ModelConstructor) {
    this.ModelClass = c;
    const m = new c();
    this.tableName = m.tableName;
    this.primaryKey = m.primaryKey;
    this.fields = m.fields;
  }

  public all = () => {
    const rows: IDatabaseRow[] = db
      .prepare(getSelectQuery(this.tableName))
      .all();
    return rows.map(this.getModelFromRow);
  };

  public findOne = (pk: PrimaryKeyValue) => {
    const row: IDatabaseRow = db
      .prepare(getSelectQuery(this.tableName, this.primaryKey, true))
      .get(pk);
    return this.getModelFromRow(row);
  };

  public create = (instance: IModelInstance) => {
    const m = new this.ModelClass(instance);
    m.save();
    return m;
  };

  public up = (ifNotExists: boolean = true) => {
    const create = db.prepare(
      getCreateTableQuery(this.tableName, this.primaryKey, this.fields, {
        ifNotExists,
      }),
    );
    create.run();
  };

  public down = () => {
    const drop = db.prepare(getDropTableQuery(this.tableName, true));
    drop.run();
  };

  private getModelFromRow = (row: IDatabaseRow) => {
    const instance: IModelInstance = {};
    Object.keys(row).forEach(key => {
      const fieldType = this.fields[key];
      if (typeof fieldType !== 'undefined') {
        instance[key] = fieldType.get(row[key]);
      }
    });
    return new this.ModelClass(instance, true);
  };
}

export default ModelManager;
