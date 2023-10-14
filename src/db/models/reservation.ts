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

    @sequelize.BelongsTo(() => User)
    user?: User;
    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
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
