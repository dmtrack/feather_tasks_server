import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Column } from '../db/models/column';
import { Task } from '../db/models/task';
import { User } from '../db/models/user';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';

class ColumnService {
    async create(column: Column) {
        await connection.transaction(async (t: Transaction) => {
            try {
                const { userId, name, order } = column;

                const newColumn: Column = await Column.create(
                    {
                        userId,
                        name,
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

    async getUserColumns(userId: number) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const user = await User.findByPk(userId);
                    if (!user) {
                        return new EntityError(
                            `there is no user with id:${userId} in data-base`,
                            400,
                        );
                    }

                    const columns = await Column.findAll({
                        where: { userId },
                        transaction: t,
                    });

                    return columns;
                },
            );
            return result;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown error is occured');
        }
    }

    async getColumns() {
        try {
            const columns = await Task.findAll();
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
