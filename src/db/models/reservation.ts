import * as sequelize from 'sequelize-typescript';
import { Room } from './room';
import { User } from './user';

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
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    dateStart!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    dateEnd!: string;
}
