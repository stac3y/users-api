import { Table, Column, Model, AllowNull, Unique } from 'sequelize-typescript';

@Table({ modelName: 'users' })
export class UserModel extends Model {
  @AllowNull(false)
  @Unique(true)
  @Column
  phone: string;

  @Unique(true)
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}
