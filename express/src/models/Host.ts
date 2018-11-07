import { createModel, fieldTypes, ModelManager } from '../lib/model';

const Host = createModel({
  fields: {
    address: fieldTypes.varchar(15),
    id: fieldTypes.int,
  },
  tableName: 'hosts',
  toString: () => `Host ${this.get('id')}`,
});

export const HostManager = new ModelManager(Host);

export default Host;
