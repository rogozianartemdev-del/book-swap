import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('users', {
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
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    avatar_url: { type: DataTypes.STRING(500), allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('users');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
};