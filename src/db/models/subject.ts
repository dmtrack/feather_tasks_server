import * as sequelize from 'sequelize-typescript';
import { Grade } from './grade';

@sequelize.Table({
    tableName: 'subject',
    timestamps: false,
})
export class Subject extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    name!: string;

    @sequelize.HasMany(() => Grade)
    grades!: Grade[];
}
