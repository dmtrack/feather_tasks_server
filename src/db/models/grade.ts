import * as sequelize from 'sequelize-typescript';
import { User } from './user';

@sequelize.Table({
    timestamps: false,
    tableName: 'grades',
})
export class Grade extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

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
    })
    subject!: string;

    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    grade!: number;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
        allowNull: false,
    })
    date!: string;
}
