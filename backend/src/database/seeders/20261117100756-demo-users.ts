import bcrypt from 'bcrypt';
import { QueryInterface } from 'sequelize';

const DEMO_PASSWORD = 'Password123!';
const SALT_ROUNDS = 10;

const DEMO_USERS = [
  { name: 'Admin', email: 'admin@example.com', role: 'admin' },
  { name: 'Анна Коваленко', email: 'anna@example.com', role: 'user' },
  { name: 'Олег Шевченко', email: 'oleh@example.com', role: 'user' },
  { name: 'Марія Бондар', email: 'maria@example.com', role: 'user' },
];

export const up = async (queryInterface: QueryInterface) => {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, SALT_ROUNDS);

  await queryInterface.bulkInsert(
    'users',
    DEMO_USERS.map((user) => ({ ...user, password: passwordHash })),
  );
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete('users', {
    email: DEMO_USERS.map((user) => user.email),
  });
};