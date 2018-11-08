import { IFieldTypeMapping } from './types';
export { IModelInstance } from './types';

export { default as createModel } from './Model';
export { default as ModelManager } from './ModelManager';

export class ValidationError extends Error {}

export const fieldTypes: IFieldTypeMapping = {
  boolean: {
    databaseKeyword: 'INTEGER',
    get: (v: number) => !!v,
    set: (v: boolean) => (v ? 1 : 0),
  },
  foreignKey: (
    relatedTable: string,
    relatedTablePrimaryKey: string = 'id',
  ) => ({
    databaseKeyword: 'INTEGER',
    get: (v: number) => v,
    relatedTable,
    relatedTablePrimaryKey,
    set: (v: number) => v,
  }),
  int: {
    databaseKeyword: 'INTEGER',
    get: (v: number) => v,
    set: (v: number) => v,
  },
  text: {
    databaseKeyword: 'TEXT',
    get: (v: string) => v,
    set: (v: string) => `'${v}'`,
  },
  varchar: (length: number) => ({
    databaseKeyword: `VARCHAR(${length})`,
    get: (v: string) => v,
    set: (v: string) => `'${v}'`,
  }),
};
