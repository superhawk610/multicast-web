import {
  Table,
  Column,
  PrimaryKey,
  Model,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

import Channel from './channel.model';

@Table
class Device extends Model<Device> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public identifier: string;

  @Column
  public nickname: string;

  @Column
  public status: string;

  @AllowNull
  @ForeignKey(() => Channel)
  @Column
  public channelId: number;

  @BelongsTo(() => Channel, {
    foreignKey: {
      allowNull: true,
    },
  })
  public channel: Channel;
}

export default Device;
