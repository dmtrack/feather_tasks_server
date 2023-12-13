import * as sequelize from 'sequelize-typescript';
import { Column } from './column';
import { Task } from './task';
import { Token } from './token';

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
    _id!: number;

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

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
    avatarUrl!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    tokenId!: number;

    @sequelize.HasMany(() => Column, { onDelete: 'cascade' })
    columns!: Column[];

    @sequelize.HasMany(() => Task)
    tasks!: Task[];

    @sequelize.HasOne(() => Token, { onDelete: 'cascade' })
    token!: Token;
}
