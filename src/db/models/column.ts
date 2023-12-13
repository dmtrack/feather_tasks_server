import * as sequelize from 'sequelize-typescript';
import { Task } from './task';
import { User } from './user';

@sequelize.Table({
    timestamps: true,
    tableName: 'columns',
})
export class Column extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    order!: number;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;

    @sequelize.BelongsTo(() => User)
    user!: User;

    @sequelize.HasMany(() => Task, { onDelete: 'cascade' })
    tasks!: Task[];
}
