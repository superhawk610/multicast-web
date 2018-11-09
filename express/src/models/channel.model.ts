import {
  Table,
  PrimaryKey,
  Column,
  Model,
  HasMany,
  Sequelize,
  AutoIncrement,
  Is,
} from 'sequelize-typescript';

import Device from './device.model';

@Table
class Channel extends Model<Channel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public name: string;

  @Column
  public layout: string;

  @Column
  public duration: number;

  @Is(/0|90|180|270/)
  @Column
  public rotation: number;

  @Column(Sequelize.STRING)
  public get urls(): string[] {
    return JSON.parse(this.getDataValue('urls'));
  }

  public set urls(value: string[]) {
    this.setDataValue('urls', JSON.stringify(value));
  }

  @HasMany(() => Device)
  public devices: Device[];
}

export default Channel;
