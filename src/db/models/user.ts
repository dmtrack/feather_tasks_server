import * as sequelize from 'sequelize-typescript';
import { Todo } from './todo';

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
    lastname!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @sequelize.HasMany(() => Todo, { onDelete: 'cascade' })
    userTodos!: Todo[];
}
