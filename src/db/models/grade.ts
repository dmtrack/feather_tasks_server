import * as sequelize from 'sequelize-typescript';
import { Subject } from './subject';
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

    @sequelize.BelongsTo(() => Subject)
    subject?: Subject;
    @sequelize.ForeignKey(() => Subject)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    subjectId!: number;

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
