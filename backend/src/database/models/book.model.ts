import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize, } from 'sequelize';
import { sequelize } from '../sequelize';
import { User } from './user.model';
import { ExchangeRequest } from './exchange-request.model';

export class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
    declare id: CreationOptional<string>;
    declare ownerId: string;
    declare name: string;
    declare author: string;
    declare description: CreationOptional<string | null>;
    declare photoUrl: CreationOptional<string | null>;
    declare filePath: CreationOptional<string | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare owner?: NonAttribute<User>;

    static associate(): void {
        Book.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
        Book.hasMany(ExchangeRequest, {
            foreignKey: 'bookId',
            as: 'exchangeRequests',
            onDelete: 'CASCADE',
        });
    }
}

Book.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuidv7()'),
        },
        ownerId: { type: DataTypes.UUID, allowNull: false },
        name: { type: DataTypes.STRING(255), allowNull: false },
        author: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        photoUrl: { type: DataTypes.STRING(500), allowNull: true },
        filePath: { type: DataTypes.STRING(500), allowNull: true },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
        sequelize,
        tableName: 'books',
        modelName: 'Book',
        underscored: true,
    },
);