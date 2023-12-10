import * as sequelize from 'sequelize-typescript';
import { Task } from './task';

@sequelize.Table({
    timestamps: true,
    tableName: 'users',
})
export class User extends sequelize.Model {
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
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    login!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @sequelize.HasMany(() => Task, { onDelete: 'cascade' })
    userTasks!: Task[];
}
