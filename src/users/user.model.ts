import { Table, Column, Model, AllowNull, Unique, DataType } from 'sequelize-typescript'

@Table({ modelName: 'users' })
export class UserModel extends Model {
    @AllowNull(false)
    @Unique(true)
    @Column(DataType.CHAR(12))
    phone: string

    @Unique(true)
    @AllowNull(false)
    @Column(DataType.CHAR(256))
    email: string

    @AllowNull(false)
    @Column(DataType.CHAR(64))
    password: string
}
