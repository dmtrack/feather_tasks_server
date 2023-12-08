import * as sequelize from 'sequelize-typescript';
import { User } from './user';

@sequelize.Table({
    timestamps: false,
    tableName: 'todos',
})
export class Todo extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id!: number;

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
    })
    name!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    description!: boolean;

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

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
    finished!: boolean;
}
