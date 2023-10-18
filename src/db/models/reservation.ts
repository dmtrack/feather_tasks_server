import * as sequelize from 'sequelize-typescript';
import { Room } from './room';
import { User } from './user';

@sequelize.Table({
    timestamps: false,
    tableName: 'reservations',
})
export class Reservation extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.BelongsTo(() => Room)
    room?: Room;
    @sequelize.ForeignKey(() => Room)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    roomId!: number;

    @sequelize.BelongsTo(() => User)
    user?: User;
    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    userId!: number;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
    vip!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
        allowNull: false,
    })
    dateStart!: string;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
        allowNull: false,
    })
    dateEnd!: string;
}
