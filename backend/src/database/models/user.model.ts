import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize, } from 'sequelize';
import { sequelize } from '../sequelize';
import { Book } from './book.model';
import { ExchangeRequest } from './exchange-request.model';

export enum UserRole {
    User = 'user',
    Admin = 'admin',
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: CreationOptional<UserRole>;
    declare avatarUrl: CreationOptional<string | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare books?: NonAttribute<Book[]>;

    static associate(): void {
        User.hasMany(Book, { foreignKey: 'ownerId', as: 'books', onDelete: 'CASCADE' });
        User.hasMany(ExchangeRequest, {
            foreignKey: 'requesterId',
            as: 'sentExchangeRequests',
            onDelete: 'CASCADE',
        });
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuidv7()'),
        },
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.User,
        },
        avatarUrl: { type: DataTypes.STRING(500), allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, tableName: 'users', modelName: 'User' },
);