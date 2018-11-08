import {
  createModel,
  fieldTypes,
  IModelInstance,
  ModelManager,
} from '../lib/model';

const Host = createModel({
  fields: {
    address: fieldTypes.varchar(15),
    id: fieldTypes.int,
    nickname: fieldTypes.varchar(255),
  },
  tableName: 'hosts',
  toString: (instance: IModelInstance) => `Host ${instance.id}`,
});

export const HostManager = new ModelManager(Host);

export default Host;
