export type DatabaseValue = string | number;
export type InstanceValue = string | number | boolean | null;
export type PrimaryKeyValue = string | number;

export interface IFieldDefinition {
  databaseKeyword: string;
  set: (v: any) => DatabaseValue;
  get: (v: any) => InstanceValue;
}

export type ComposedFieldDefinition = (...x: any[]) => IFieldDefinition;

export interface IModelFieldMapping {
  [fieldName: string]: IFieldDefinition;
}

export interface IModelInstance {
  [fieldName: string]: InstanceValue | undefined;
}

export interface IDatabaseRow {
  [fieldName: string]: DatabaseValue;
}

export interface IFieldTypeMapping {
  int: IFieldDefinition;
  boolean: IFieldDefinition;
  text: IFieldDefinition;
  varchar: ComposedFieldDefinition;
}

export interface IModelConfiguration {
  tableName: string;
  primaryKey?: string;
  fields: IModelFieldMapping;
  toString?: () => string;
  preValidate?: () => boolean;
  preSave?: () => void;
  serialize?: (instance: IModelInstance) => IModelInstance;
}

export interface IModel {
  tableName: string;
  primaryKey: string;
  fields: IModelFieldMapping;
  toString: () => string;
  get: (fieldName: string) => InstanceValue;
  set: (fieldName: string, value: InstanceValue) => void;
  update: (changes: IModelInstance) => void;
  preValidate: () => boolean;
  preSave: () => void;
  save: () => void;
  serialize?: () => IModelInstance;
}
