import { IModelFieldMapping, IModelInstance } from './types';

const formatCreateTableQueryFields = (
  fieldMapping: IModelFieldMapping,
  primaryKey: string,
  autoIncrement: boolean,
) => {
  return Object.keys(fieldMapping)
    .map(key => {
      const fieldType = fieldMapping[key];
      const primaryKeyDirective = key === primaryKey ? 'PRIMARY KEY' : '';
      const autoIncrementDirective =
        autoIncrement && key === primaryKey ? 'AUTOINCREMENT' : '';
      return `${key} ${
        fieldType.databaseKeyword
      } ${primaryKeyDirective} ${autoIncrementDirective}`;
    })
    .join(',');
};

const formatInsertQueryFields = (fieldMapping: IModelFieldMapping) =>
  Object.keys(fieldMapping)
    // FIXME: id shouldn't be hardcoded
    .filter(key => key !== 'id')
    .join(',');

const formatInsertQueryValues = (
  fieldMapping: IModelFieldMapping,
  instance: IModelInstance,
) => {
  return (
    Object.keys(fieldMapping)
      // FIXME: this only works when the primary key is id and
      // autoincrements
      .filter(key => key !== 'id')
      .map(key => {
        const fieldType = fieldMapping[key];
        return fieldType.set(instance[key]);
      })
      .join(',')
  );
};

const formatUpdateQueryChanges = (
  fieldMapping: IModelFieldMapping,
  instance: IModelInstance,
) => {
  return Object.keys(fieldMapping)
    .map(key => {
      const fieldType = fieldMapping[key];
      return `${key}=${fieldType.set(instance[key])}`;
    })
    .join(',');
};

export const getCreateTableQuery = (
  tableName: string,
  primaryKey: string,
  fieldMapping: IModelFieldMapping,
  { ifNotExists = false, autoIncrement = true },
) =>
  `CREATE TABLE ${
    ifNotExists ? 'IF NOT EXISTS' : ''
  } ${tableName}(${formatCreateTableQueryFields(
    fieldMapping,
    primaryKey,
    autoIncrement,
  )})`;

export const getDropTableQuery = (
  tableName: string,
  ifExists: boolean = false,
) => `DROP TABLE ${ifExists ? 'IF EXISTS' : ''} ${tableName}`;

export const getSelectQuery = (
  tableName: string,
  primaryKey: string = null,
  limitOne: boolean = false,
) =>
  `SELECT * FROM ${tableName} ${
    primaryKey ? `WHERE ${primaryKey} = ? ${limitOne ? 'LIMIT 1' : ''}` : ''
  }`;

export const getInsertQuery = (
  tableName: string,
  fieldMapping: IModelFieldMapping,
  instance: IModelInstance,
) =>
  `INSERT INTO ${tableName} (${formatInsertQueryFields(
    fieldMapping,
  )}) VALUES (${formatInsertQueryValues(fieldMapping, instance)})`;

export const getUpdateQuery = (
  tableName: string,
  primaryKey: string,
  fieldMapping: IModelFieldMapping,
  instance: IModelInstance,
) =>
  `UPDATE ${tableName} SET ${formatUpdateQueryChanges(
    fieldMapping,
    instance,
  )} WHERE ${primaryKey} = ${instance[primaryKey]}`;
