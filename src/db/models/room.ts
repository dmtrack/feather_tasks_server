import * as sequelize from 'sequelize-typescript';
import { Reservation } from './reservation';

@sequelize.Table({
    tableName: 'rooms',
    timestamps: false,
})
export class Room extends sequelize.Model {
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

    @sequelize.HasMany(() => Reservation, { onDelete: 'cascade' })
    reservations!: Reservation[];
}
