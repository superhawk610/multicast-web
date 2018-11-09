import {
  Table,
  Column,
  PrimaryKey,
  Model,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
class Host extends Model<Host> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public address: string;

  @Column
  public nickname: string;

  @Column
  public status: string;
}

export default Host;
