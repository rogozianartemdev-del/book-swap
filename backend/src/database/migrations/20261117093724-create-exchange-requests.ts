import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('exchange_requests', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.literal('uuidv7()'),
    },
    book_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'books', key: 'id' },
      onDelete: 'CASCADE',
    },
    requester_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  });

  await queryInterface.addConstraint('exchange_requests', {
    fields: ['book_id', 'requester_id'],
    type: 'unique',
    name: 'exchange_requests_book_id_requester_id_unique',
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('exchange_requests');
};