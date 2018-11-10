import {
  Table,
  Column,
  PrimaryKey,
  Model,
  AutoIncrement,
  Sequelize,
} from 'sequelize-typescript';
import { IncomingHttpHeaders } from 'http';

@Table
class Probe extends Model<Probe> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public address: string;

  @Column
  public responseCode: number;

  @Column(Sequelize.STRING)
  public get headers(): IncomingHttpHeaders {
    return JSON.parse(this.getDataValue('headers'));
  }

  public set headers(value: IncomingHttpHeaders) {
    this.setDataValue('headers', JSON.stringify(value));
  }
}

export default Probe;
