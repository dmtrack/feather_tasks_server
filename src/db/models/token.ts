import * as sequelize from 'sequelize-typescript';
import { User } from './user';

@sequelize.Table({
    timestamps: false,
    tableName: 'tokens',
})
export class Token extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id!: number;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;

    @sequelize.BelongsTo(() => User)
    user!: User;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
    refreshToken!: string;
}
