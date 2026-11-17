import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize, } from 'sequelize';
import { sequelize } from '../sequelize';
import { Book } from './book.model';
import { User } from './user.model';

export class ExchangeRequest extends Model<
    InferAttributes<ExchangeRequest>,
    InferCreationAttributes<ExchangeRequest>
> {
    declare id: CreationOptional<string>;
    declare bookId: string;
    declare requesterId: string;
    declare createdAt: CreationOptional<Date>;

    declare book?: NonAttribute<Book>;
    declare requester?: NonAttribute<User>;

    static associate(): void {
        ExchangeRequest.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
        ExchangeRequest.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
      }
}

ExchangeRequest.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuidv7()'),
        },
        bookId: { type: DataTypes.UUID, allowNull: false },
        requesterId: { type: DataTypes.UUID, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
        sequelize,
        tableName: 'exchange_requests',
        modelName: 'ExchangeRequest',
        updatedAt: false,
    },
);