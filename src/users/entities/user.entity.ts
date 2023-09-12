import {
    Table,
    Column,
    Model,
    AllowNull,
    Unique,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from 'sequelize-typescript'

@Table({ modelName: 'users' })
export class User extends Model {
    @AllowNull(false)
    @Unique(true)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: string

    @AllowNull(true)
    @Unique(true)
    @Column(DataType.STRING)
    phone?: string

    @AllowNull(true)
    @Unique(true)
    @Column(DataType.STRING)
    email?: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @AllowNull(true)
    @Column(DataType.STRING)
    name?: string

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @DeletedAt
    deletedAt?: Date
}
