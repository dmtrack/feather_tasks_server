import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Column } from '../db/models/column';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { checkBody } from './error.service';

class ColumnService {
    async getUserColumns(userId: number) {
        try {
            const columns = await Column.findAll({
                where: { userId },
            });

            return columns;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown error is occured');
        }
    }

    async getColumnById(id: number) {
        try {
            const column = await Column.findByPk(id);

            return column;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown error is occured');
        }
    }

    async create(column: Column) {
        await connection.transaction(async (t: Transaction) => {
            try {
                const { userId, title, order } = column;

                const newColumn: Column = await Column.create(
                    {
                        userId,
                        title,
                        order,
                    },
                    { transaction: t },
                );
                return newColumn;
            } catch (e: unknown) {
                if (e instanceof DBError) {
                    return new DBError('data base error', 501, e);
                }
                return new Error('unknown error is occured');
            }
        });
    }

    async getColumns() {
        try {
            const columns = await Column.findAll();
            return columns;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown error is occured');
        }
    }

    async destroyColumn(id: number) {
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
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown error is occured');
        }
    }
}

module.exports = new ColumnService();
