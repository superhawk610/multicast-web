import { db } from '../lib/db';

interface FieldType {
  str: string;
  fmt: (v: any) => string;
}
type ComposedFieldType = (...x: Array<any>) => FieldType;
type FieldTypeMapping = {
  int: FieldType;
  varchar: ComposedFieldType;
};
type ModelFieldTypes = {
  [fieldName: string]: FieldType;
};
type ModelValueTypes = {
  [fieldName: string]: string | number;
};

const fieldTypes: FieldTypeMapping = {
  int: { str: 'INT', fmt: (v: number) => v.toString() },
  varchar: (length: number) => ({
    str: `VARCHAR(${length})`,
    fmt: (v: string) => `'${v}'`,
  }),
};

class Host {
  dbTable: string = 'hosts';
  fields: ModelFieldTypes = {
    id: fieldTypes.int,
    address: fieldTypes.varchar(15),
  };
  values: ModelValueTypes;

  getFieldNames = () => {
    return Object.keys(this.fields).join(',');
  };

  getValues = () => {
    return Object.keys(this.fields)
      .map(key => {
        const fieldType = this.fields[key];
        return fieldType.fmt(this.values[key]);
      })
      .join(',');
  };

  save() {
    const insert = db.prepare(
      `INSERT INTO ${
        this.dbTable
      } (${this.getFieldNames()}) VALUES (${this.getValues()})`,
    );
    insert.run();
  }
}

export default Host;
