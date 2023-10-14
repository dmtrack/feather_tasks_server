import * as sequelize from 'sequelize-typescript';
import { Room } from './room';

@sequelize.Table({
    timestamps: true,
    tableName: 'reservations',
})
export class Reservation extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id!: number;

    @sequelize.BelongsTo(() => Room)
    room?: Room;
    @sequelize.ForeignKey(() => Room)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    roomId!: number;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
        allowNull: false,
    })
    dateStart!: Date;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
        allowNull: false,
    })
    dateEnd!: Date;
}
