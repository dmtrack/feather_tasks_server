import * as sequelize from 'sequelize-typescript';
import { Grade } from './grade';

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
        unique: true,
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

    @sequelize.HasMany(() => Grade, { onDelete: 'cascade' })
    userGrades!: Grade[];
}
