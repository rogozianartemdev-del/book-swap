import { Button, Layout, Menu, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useMainLayout } from './useMainLayout';

export const MainLayout = () => {
  const { user, menuItems, activePath, onLogout } = useMainLayout();

  return (
    <Layout className="min-h-screen">
      <Layout.Header className="flex items-center gap-4 px-4">
        <Typography.Text strong className="!text-white whitespace-nowrap">
           Обмін книгами
        </Typography.Text>
        <Menu
          theme="dark"
          mode="horizontal"
          className="flex-1 min-w-0"
          selectedKeys={activePath ? [activePath] : []}
          items={menuItems.map(({ path, label }) => ({
            key: path,
            label: <Link to={path}>{label}</Link>,
          }))}
        />
        <Typography.Text className="!text-white hidden sm:block">{user?.name}</Typography.Text>
        <Button onClick={onLogout}>Вийти</Button>
      </Layout.Header>
      <Layout.Content className="mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};