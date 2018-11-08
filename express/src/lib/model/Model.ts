import { db } from '../db';

import { ValidationError } from './index';
import { getInsertQuery, getUpdateQuery } from './query-format';
import {
  IModel,
  IModelConfiguration,
  IModelFieldMapping,
  IModelInstance,
  InstanceValue,
} from './types';

const validateInstance = (
  fieldMapping: IModelFieldMapping,
  instance: IModelInstance,
) => {
  const validatedInstance: IModelInstance = {};
  Object.keys(instance).forEach(key => {
    if (typeof fieldMapping[key] !== 'undefined') {
      validatedInstance[key] = instance[key];
    } else {
      // tslint:disable-next-line:no-console
      console.warn(`attempted to set invalid field ${key}`);
    }
  });
  return validatedInstance;
};

const createModel = ({
  tableName,
  primaryKey = 'id',
  fields,
  toString,
  preValidate,
  preSave,
  serialize,
}: IModelConfiguration) =>
  class implements IModel {
    public tableName: string = tableName;
    public primaryKey: string = primaryKey;
    public fields: IModelFieldMapping = fields;

    public preValidate = preValidate ? preValidate : () => true;

    public preSave = preSave ? preSave : (): void => undefined;

    private persisted: boolean;
    private instance: IModelInstance;

    public constructor(instance?: IModelInstance, persisted: boolean = false) {
      if (instance) {
        this.instance = validateInstance(this.fields, instance);
        this.persisted = persisted;
      }
    }

    public toString = () => {
      const stringValue = toString
        ? toString(this.instance)
        : `Model ${this.instance[this.primaryKey]}`;
      return stringValue;
    };

    public get = (fieldName: string) =>
      this.fields[fieldName].get(this.instance[fieldName]);

    public set = (fieldName: string, value: InstanceValue) =>
      (this.instance[fieldName] = value);

    public update = (changes: IModelInstance) => {
      Object.keys(changes).forEach(key => {
        const fieldType = this.fields[key];
        if (typeof fieldType !== 'undefined') {
          this.instance[key] = changes[key];
        }
      });
    };

    public save = () => {
      if (!this.validate()) {
        throw new ValidationError(`invalid values for ${this.toString()}`);
      }

      if (this.persisted) {
        const update = db.prepare(
          getUpdateQuery(
            this.tableName,
            this.primaryKey,
            this.fields,
            this.instance,
          ),
        );
        update.run();
      } else {
        const insert = db.prepare(
          getInsertQuery(this.tableName, this.fields, this.instance),
        );
        insert.run();
        this.persisted = true;
      }
    };

    public serialize = () => {
      const serializedInstance = serialize
        ? serialize(this.instance)
        : this.instance;
      return serializedInstance;
    };

    private validate = () => this.preValidate() && true;
  };

export default createModel;
