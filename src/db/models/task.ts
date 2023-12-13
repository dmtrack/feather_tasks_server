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
    id!: number;

    @sequelize.ForeignKey(() => Column)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    columnId!: number;

    @sequelize.BelongsTo(() => Column)
    column!: Column;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    name!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    description!: boolean;
}
