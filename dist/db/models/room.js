"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize = __importStar(require("sequelize-typescript"));
const reservation_1 = require("./reservation");
let Room = class Room extends sequelize.Model {
};
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
], Room.prototype, "id", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
], Room.prototype, "name", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: true,
    })
], Room.prototype, "image", void 0);
__decorate([
    sequelize.HasMany(() => reservation_1.Reservation, { onDelete: 'cascade' })
], Room.prototype, "reservations", void 0);
Room = __decorate([
    sequelize.Table({
        timestamps: true,
        tableName: 'rooms',
    })
], Room);
exports.Room = Room;
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
