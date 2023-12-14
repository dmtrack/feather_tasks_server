import * as sequelize from 'sequelize-typescript';
import { Column } from './column';
import { User } from './user';

@sequelize.Table({
    timestamps: false,
    tableName: 'tasks',
})
export class Task extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    _id!: number;

    @sequelize.ForeignKey(() => Column)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    columnId!: number;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;

    @sequelize.BelongsTo(() => User)
    user!: User;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    title!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    description!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
    })
    order!: number;
}
