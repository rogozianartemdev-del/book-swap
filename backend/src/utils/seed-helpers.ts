import { QueryInterface, QueryTypes } from 'sequelize';

export const getUserId = async (queryInterface: QueryInterface, email: string): Promise<string> => {
  const [user] = await queryInterface.sequelize.query<{ id: string }>(
    'SELECT id FROM users WHERE email = :email',
    { replacements: { email }, type: QueryTypes.SELECT },
  );

  if (!user) {
    throw new Error(`User with email "${email}" not found. Run demo-users seeder first.`);
  }

  return user.id;
};

export const getBookId = async (queryInterface: QueryInterface, name: string): Promise<string> => {
  const [book] = await queryInterface.sequelize.query<{ id: string }>(
    'SELECT id FROM books WHERE name = :name',
    { replacements: { name }, type: QueryTypes.SELECT },
  );

  if (!book) {
    throw new Error(`Book "${name}" not found. Run demo-books seeder first.`);
  }

  return book.id;
};