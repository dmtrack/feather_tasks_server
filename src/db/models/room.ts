import * as sequelize from 'sequelize-typescript';
import { Reservation } from './reservation';

@sequelize.Table({
    timestamps: true,
    tableName: 'rooms',
})
export class Room extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    image!: string;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    isEnabled!: boolean;

    @sequelize.HasMany(() => Reservation, { onDelete: 'cascade' })
    items!: Reservation[];
}

// export class Room {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" })
//   hotel: HotelDocument;

//   @Prop({ unique: false })
//   description: string;

//   @Prop({ unique: false })
//   images: [Buffer];

//   @Prop({ required: true, unique: false })
//   createdAt: Date;

//   @Prop({ required: true, unique: false })
//   updatedAt: Date;

//   @Prop({ required: true, unique: false, default: true })
//   isEnabled: boolean;
// }
