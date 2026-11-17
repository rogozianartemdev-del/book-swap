import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('books', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.literal('uuidv7()'),
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    author: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    photo_url: { type: DataTypes.STRING(500), allowNull: true },
    file_path: { type: DataTypes.STRING(500), allowNull: true },
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

  await queryInterface.addIndex('books', ['owner_id']);
  await queryInterface.addIndex('books', ['name']);
  await queryInterface.addIndex('books', ['author']);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('books');
};