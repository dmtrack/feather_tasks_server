import * as sequelize from 'sequelize-typescript';
import { Reservation } from './reservation';

@sequelize.Table({
    timestamps: false,
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
    email!: string;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    vip!: boolean;

    @sequelize.HasMany(() => Reservation, { onDelete: 'cascade' })
    userReservation!: Reservation[];
}
