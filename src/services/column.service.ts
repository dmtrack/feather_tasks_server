import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Column } from '../db/models/column';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { IColumnCreate, IColumnUpdate } from '../types/column.interface';

class ColumnService {
    async getUserColumns(userId: number) {
        try {
            const columns = await Column.findAll({
                where: { userId },
            });

            return columns;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async getColumnById(id: number) {
        try {
            const column = await Column.findByPk(id);

            return column;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async create(column: IColumnCreate) {
        const { userId, title, order } = column;
        const newColumn: Column = await Column.create({
            userId,
            title,
            order,
        });
        return newColumn;
    }

    catch(e: unknown) {
        return new DBError('data base error', 501, e);
    }

    async getColumns() {
        try {
            const columns = await Column.findAll();
            return columns;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async updateColumn(column: IColumnUpdate) {
        const { columnId } = column;
        try {
            const foundedColumn = Column.findByPk(columnId);

            if (!foundedColumn) {
                return new EntityError(
                    `there is no column with id:${columnId} in data-base`,
                    400,
                );
            }
            const updatedColumn = Column.update(column, {
                where: { id: columnId },
            });
            return updatedColumn;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async deleteColumn(id: number) {
        try {
            const column = await Column.findByPk(id);

            if (!column) {
                return new EntityError(
                    `there is no column with id:${id} in data-base`,
                    400,
                );
            }
            await Column.destroy({ where: { id } });
            return `column with id:${id} is deleted`;
        } catch (e: unknown) {
            return new DBError('column/service delete db error', 501, e);
        }
    }
}

module.exports = new ColumnService();
