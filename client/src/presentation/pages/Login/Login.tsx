import { ROUTES } from '@/presentation/routes/routes.const';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';

export const Login = () => {
  const { onFinish, isLoading } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <Typography.Title level={3}>Вхід</Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input autoFocus />
          </Form.Item>
          <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Увійти
          </Button>
        </Form>
        <div className="mt-3 text-center">
          Немає акаунта? <Link to={ROUTES.register}>Зареєструватися</Link>
        </div>
      </Card>
    </div>
  );
};