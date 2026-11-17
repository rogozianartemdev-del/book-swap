import { ROUTES } from '@/presentation/routes/routes.const';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useRegister } from './useRegister';

export const Register = () => {
  const { onFinish, isLoading } = useRegister();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <Typography.Title level={3}>Реєстрація</Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Ім’я" rules={[{ required: true, min: 2, max: 100 }]}>
            <Input autoFocus />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 8, max: 72 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Підтвердіть пароль"
            dependencies={['password']}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator: (_, value) =>
                  !value || getFieldValue('password') === value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Паролі не збігаються')),
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Створити акаунт
          </Button>
        </Form>
        <div className="mt-3 text-center">
          Вже є акаунт? <Link to={ROUTES.login}>Увійти</Link>
        </div>
      </Card>
    </div>
  );
};