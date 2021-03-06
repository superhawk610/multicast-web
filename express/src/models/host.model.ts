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
  public get address(): string {
    return this.getDataValue('address');
  }

  public set address(value: string) {
    // trim trailing slash if present
    this.setDataValue('address', value.replace(/\/$/, ''));
  }

  @Column
  public nickname: string;

  @Column
  public status: string;
}

export default Host;
